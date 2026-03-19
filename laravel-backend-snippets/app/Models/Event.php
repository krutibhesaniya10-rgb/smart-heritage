<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model\n{\n    public \ = false;\n\n    protected \ = 'string';
    protected $fillable = [
        'place_id',
        'place_name',
        'state',
        'name',
        'description',
        'image_url',
        'organizer',
        'recurrence',
        'days_of_week',
        'start_date',
        'end_date',
        'is_festival',
        'festival_key',
    ];

    protected $casts = [
        'days_of_week' => 'array',
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
        'is_festival' => 'boolean',
    ];
}
