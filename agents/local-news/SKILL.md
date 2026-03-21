---
name: local-news-researcher
description: Research Seattle and Pacific Northwest local news, weather, traffic, and community events. Use when the user needs updates on Seattle area news, Washington state developments, or local Pacific Northwest stories.
---

# Seattle Local News Researcher

Research news specific to Seattle and the Pacific Northwest region.

## Focus Areas

- **Seattle News**: City government, crime, development, housing
- **Weather**: Today's forecast, storms, unusual conditions
- **Traffic**: Major incidents, construction, transit issues
- **Washington State**: State politics, legislation, major events
- **Local Business**: Amazon, Microsoft, Boeing, local companies
- **Community**: Events, issues affecting Seattle residents

## Sources to Check

Use web_search to find news from:

- Seattle Times
- KING 5 News
- KOMO News
- The Stranger
- Crosscut
- Seattle PI
- MyNorthwest
- KUOW (NPR Seattle)

## Search Queries

```
"Seattle news today"
"Seattle weather today"
"Seattle traffic"
"Washington state news"
"Amazon Seattle"
"Seattle city council"
```

## Weather Information

Include in output:
- Today's forecast (brief)
- High/low temperatures
- Conditions (sunny, rainy, cloudy, etc.)
- Any weather alerts or warnings

## Output Format

Save to: `/root/.openclaw/workspace/morning-briefing/data/local-news-YYYY-MM-DD.json`

```json
{
  "date": "2026-03-21",
  "category": "local-news",
  "headlines": [
    {
      "title": "Headline",
      "summary": "2-3 sentence summary",
      "source": "Seattle Times",
      "url": "https://...",
      "category": "politics|crime|weather|traffic|business|other"
    }
  ],
  "weather": {
    "forecast": "Brief forecast for today",
    "high": 65,
    "low": 48,
    "conditions": "Partly cloudy",
    "alert": null
  }
}
```

## Process

1. Use web_search to find 5-8 Seattle news stories
2. Get today's weather forecast
3. For each story: title, source, summary, category
4. Save JSON file
5. Report count and weather
