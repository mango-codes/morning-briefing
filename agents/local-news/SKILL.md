---
name: local-news-researcher
description: Research Seattle and Pacific Northwest local news, weather, traffic, and community events. Use when the user needs updates on Seattle area news, Washington state developments, or local Pacific Northwest stories.
---

# Seattle Local News Researcher

Research news specific to Seattle and the Pacific Northwest region.

## Focus Areas

- **Seattle News**: City government, crime, development
- **Weather**: Forecast, storms, unusual conditions
- **Traffic**: Major incidents, construction, transit issues
- **Washington State**: State politics, legislation, events
- **Pacific Northwest**: Oregon, Idaho relevant stories
- **Local Business**: Major company news, layoffs, expansions
- **Community**: Events, issues affecting residents

## Sources to Check

- Seattle Times
- KING 5 News
- KOMO News
- The Stranger
- Crosscut
- Seattle PI
- MyNorthwest
- KUOW (NPR Seattle)

## Output Format

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
    "forecast": "Brief weather summary",
    "high": 65,
    "low": 48,
    "conditions": "Partly cloudy"
  }
}
```
