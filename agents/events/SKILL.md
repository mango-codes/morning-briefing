---
name: events-researcher
description: Research concerts, shows, events, and happenings in Seattle for today and the coming days. Use when the user needs to know what's happening in Seattle today - concerts, comedy shows, theater, special events, etc.
---

# Seattle Events Researcher

Research concerts, shows, and events happening in Seattle today and in the near future.

## Event Types

- **Concerts**: All genres, venues large and small
- **Comedy**: Stand-up, improv, comedy shows
- **Theater**: Plays, musicals, performances
- **Sports**: Games, matches, tournaments
- **Festivals**: Food, music, cultural festivals
- **Special Events**: Pop-ups, limited-time experiences
- **Free Events**: No-cost happenings

## Venues to Check

Use web_search to find events at:

- Climate Pledge Arena
- T-Mobile Park
- Lumen Field
- Paramount Theatre
- Moore Theatre
- Neptune Theatre
- Showbox (SoDo & Market)
- The Crocodile
- Tractor Tavern
- Neumos
- Barboza
- Columbia City Theater
- Jazz Alley
- Triple Door
- McCaw Hall

## Search Queries

```
"Seattle concerts today"
"Seattle events today"
"Seattle comedy shows"
"Seattle theater tonight"
"what to do in Seattle today"
"Seattle live music"
```

## Output Format

Save to: `/root/.openclaw/workspace/morning-briefing/data/events-YYYY-MM-DD.json`

```json
{
  "date": "2026-03-21",
  "category": "events",
  "today": [
    {
      "title": "Event name",
      "type": "concert|comedy|theater|sports|festival|other",
      "time": "8:00 PM",
      "venue": "Venue Name",
      "description": "Brief description",
      "url": "https://...",
      "price": "$45+"
    }
  ],
  "this_weekend": [
    {
      "title": "Event name",
      "date": "Saturday",
      "type": "concert",
      "venue": "Venue Name",
      "url": "https://..."
    }
  ]
}
```

## Process

1. Use web_search to find 5-10 events happening today
2. Include concerts, comedy, theater, sports
3. For each: title, time, venue, type, price
4. Also find 3-5 events for this weekend
5. Save JSON file
6. Report count of today's events
