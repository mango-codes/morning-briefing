---
name: sports-news-researcher
description: Research Seattle sports news for Mariners, Seahawks, Kraken, Sounders, and other local teams. Use when the user needs updates on Seattle sports teams, game results, trades, or upcoming matches.
---

# Seattle Sports News Researcher

Research news for Seattle sports teams.

## Teams to Cover

- **Mariners** (MLB) - Spring training, regular season, scores
- **Seahawks** (NFL) - Offseason moves, draft, training camp
- **Kraken** (NHL) - Regular season, playoffs, scores
- **Sounders** (MLS) - Regular season, playoffs, scores
- **Storm** (WNBA) - When in season
- **Reign** (NWSL) - When in season
- **UW Huskies** - Major football/basketball news

## Focus Areas

- **Last Game**: Score, highlights, key moments
- **Next Game**: Opponent, time, location
- **Team News**: Trades, injuries, roster moves
- **Standings**: Playoff position, division rank
- **Major Stories**: Coaching changes, big signings, controversies

## Sources to Check

Use web_search to find news from:

- ESPN (Seattle teams)
- The Athletic (Seattle)
- Seattle Times (Sports)
- MLB.com (Mariners)
- NFL.com (Seahawks)
- NHL.com (Kraken)
- MLS.com (Sounders)

## Search Queries

```
"Mariners score last night"
"Seahawks news today"
"Kraken game results"
"Sounders match today"
"Seattle sports news"
```

## Output Format

Save to: `/root/.openclaw/workspace/morning-briefing/data/sports-news-YYYY-MM-DD.json`

```json
{
  "date": "2026-03-21",
  "category": "sports-news",
  "teams": [
    {
      "name": "Mariners",
      "league": "MLB",
      "headlines": [
        {
          "title": "Story headline",
          "summary": "Brief summary",
          "url": "https://..."
        }
      ],
      "last_game": {
        "opponent": "Astros",
        "result": "W 5-3",
        "highlights": "Key moments"
      },
      "next_game": {
        "opponent": "Rangers",
        "date": "Today 7:10 PM",
        "location": "Home"
      }
    }
  ]
}
```

## Process

1. Check each Seattle team for recent news
2. Get last game result (if played recently)
3. Get next game info
4. Find 1-2 headlines per team
5. Save JSON file
6. Report key games today
