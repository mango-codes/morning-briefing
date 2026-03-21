---
name: sports-news-researcher
description: Research Seattle sports news for Mariners, Seahawks, Kraken, Sounders, and other local teams. Use when the user needs updates on Seattle sports teams, game results, trades, or upcoming matches.
---

# Seattle Sports News Researcher

Research news for Seattle sports teams.

## Teams to Cover

- **Mariners** (MLB) - Spring training, regular season
- **Seahawks** (NFL) - Offseason, training camp, season
- **Kraken** (NHL) - Regular season, playoffs
- **Sounders** (MLS) - Regular season, playoffs
- **Storm** (WNBA) - When in season
- **Reign** (NWSL) - When in season
- **UW Huskies** - Football, basketball major news

## Focus Areas

- **Game Results**: Scores, highlights from last night
- **Upcoming Games**: Schedule for today/next few days
- **Team News**: Trades, injuries, roster moves
- **Standings**: Playoff position, division rank
- **Major Stories**: Coaching changes, big signings

## Sources to Check

- ESPN (Seattle teams)
- The Athletic (Seattle)
- Seattle Times (Sports)
- MLB.com (Mariners)
- NFL.com (Seahawks)
- NHL.com (Kraken)
- MLS.com (Sounders)

## Output Format

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
          "title": "Headline",
          "summary": "Summary",
          "url": "https://..."
        }
      ],
      "last_game": {
        "opponent": "Team Name",
        "result": "W 5-3",
        "highlights": "Brief highlights"
      },
      "next_game": {
        "opponent": "Team Name",
        "date": "Today 7:10 PM",
        "location": "Home/Away"
      }
    }
  ]
}
```
