<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->query('id');
        $state = $request->query('state');
        $month = $request->query('month') ? (int) $request->query('month') : null;
        $upcoming = $request->query('upcoming', '1');
        $upcoming = $upcoming === '1' || strtolower((string) $upcoming) === 'true';
        $sort = $request->query('sort', 'nearest');

        $query = Event::query();

        if ($id) {
            $query->where('id', $id);
        }

        if ($state && in_array($state, ['Gujarat', 'Rajasthan'], true)) {
            $query->where('state', $state);
        }

        $events = $query->get();

        $today = Carbon::today();

        $items = $events->map(function (Event $event) use ($today, $month, $upcoming) {
            $from = $upcoming ? $today->copy() : ($month ? Carbon::create($today->year, $month, 1) : $today->copy());
            $next = $this->nextOccursOn($event, $from, $month);

            return [
                'id' => (string) $event->id,
                'name' => $event->name,
                'description' => $event->description,
                'state' => $event->state,
                'placeId' => $event->place_id,
                'placeName' => $event->place_name,
                'startDate' => $event->start_date?->format('Y-m-d'),
                'endDate' => $event->end_date?->format('Y-m-d'),
                'recurrence' => $event->recurrence,
                'daysOfWeek' => $event->days_of_week,
                'imageUrl' => $event->image_url,
                'organizer' => $event->organizer,
                'isFestival' => (bool) $event->is_festival,
                'festivalKey' => $event->festival_key,
                'nextOccursOn' => $next?->format('Y-m-d'),
                'dateLabel' => $this->dateLabel($event),
            ];
        });

        if ($month) {
            $items = $items->filter(fn ($i) => !is_null($i['nextOccursOn']));
        }

        if ($upcoming) {
            $items = $items->filter(fn ($i) => !is_null($i['nextOccursOn']));
        }

        $items = $items->values();

        if ($sort === 'startDate') {
            $items = $items->sortBy('startDate')->values();
        } else {
            $items = $items->sortBy(function ($i) {
                return $i['nextOccursOn'] ?? '9999-12-31';
            })->values();
        }

        return response()->json($items);
    }

    private function dateLabel(Event $event): string
    {
        $start = $event->start_date;
        $end = $event->end_date;

        $startMon = $start?->format('M');
        $endMon = $end?->format('M');

        return match ($event->recurrence) {
            'single' => $start?->format('Y-m-d') ?? '',
            'range' => $end ? "$startMon–$endMon" : (string) $startMon,
            'daily' => $end ? "Daily ($startMon–$endMon)" : "Daily ($startMon)",
            'weekend' => $end ? "Weekends ($startMon–$endMon)" : "Weekends ($startMon)",
            'weekly' => $end ? "Weekly ($startMon–$endMon)" : "Weekly ($startMon)",
            default => $start?->format('Y-m-d') ?? '',
        };
    }

    private function nextOccursOn(Event $event, Carbon $from, ?int $month): ?Carbon
    {
        $start = $event->start_date?->copy();
        if (!$start) return null;

        $end = ($event->end_date ?? $event->start_date)?->copy();
        if (!$end) return null;

        $windowStart = null;
        $windowEnd = null;

        if ($month) {
            $windowStart = Carbon::create($from->year, $month, 1)->startOfDay();
            $windowEnd = $windowStart->copy()->endOfMonth()->startOfDay();
        }

        $cursor = $from->copy()->startOfDay();
        if ($cursor->lt($start)) $cursor = $start->copy();
        if ($windowStart && $cursor->lt($windowStart)) $cursor = $windowStart->copy();

        $limit = $end->copy();
        if ($windowEnd && $limit->gt($windowEnd)) $limit = $windowEnd->copy();

        if ($cursor->gt($limit)) return null;

        $recurrence = $event->recurrence;

        if ($recurrence === 'single') {
            $d = $start->copy();
            if ($month && ($d->lt($windowStart) || $d->gt($windowEnd))) return null;
            return $d->gte($from) ? $d : null;
        }

        if ($recurrence === 'range') {
            if ($from->betweenIncluded($start, $end)) {
                return $cursor;
            }
            return $start->gte($from) ? $start : null;
        }

        if ($recurrence === 'daily') {
            return $cursor;
        }

        $days = [];
        if ($recurrence === 'weekend') {
            $days = [0, 6]; // Sun, Sat
        } elseif (is_array($event->days_of_week) && count($event->days_of_week) > 0) {
            $days = array_map('intval', $event->days_of_week);
        }

        if (count($days) === 0) {
            return $cursor;
        }

        for ($i = 0; $i < 370; $i++) {
            if ($cursor->gt($limit)) return null;
            if ($cursor->betweenIncluded($start, $end)) {
                if (in_array($cursor->dayOfWeek, $days, true)) {
                    return $cursor;
                }
            }
            $cursor->addDay();
        }

        return null;
    }
}
