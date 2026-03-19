# Laravel Events API (Snippets)

This folder contains copy-paste ready Laravel files for an `Event` model + `/api/events` endpoint that matches the frontend in this repo (`/events`).

## What you get
- `Event` model + migration
- `EventSeeder` with Gujarat/Rajasthan events (March–June 2026)
- `EventController@index` at `GET /api/events`

## Query params supported
- `state`: `Gujarat` | `Rajasthan`
- `month`: `1..12`
- `upcoming`: `1` or `0` (defaults to `1`)
- `sort`: `nearest` (default) or `startDate`
- `id`: event id

## Response fields (per item)
Each item returns the stored columns plus:
- `nextOccursOn`: nearest upcoming occurrence date (`YYYY-MM-DD`) within the query constraints (or `null`)
- `dateLabel`: human friendly summary like `Daily (Mar–Jun)`

## Notes
- Festival dates in the seed are placeholders and should be verified for your target year.
- If your project already has a `places` table, replace `place_id` with a foreign key.
