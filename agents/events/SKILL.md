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

## Sources to Check

- Seattle Times (Events)
- The Stranger (Events)
- Songkick (Seattle)
- Bandsintown
- Ticketmaster
- StubHub
- Eventbrite
- Seattle Theatre Group
- Visit Seattle

## Output Format

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
