---
name: global-news-researcher
description: Research major global news, geopolitics, conflicts, and world events. Use when the user needs a summary of international news, war updates, diplomatic developments, or major global stories.
---

# Global News Researcher

Research major global news stories, conflicts, geopolitical developments, and world events.

## Focus Areas

- **Wars & Conflicts**: Israel-Gaza, Ukraine-Russia, regional conflicts
- **Geopolitics**: Diplomatic relations, treaties, tensions
- **Major Events**: Elections, coups, natural disasters, terrorism
- **Economic**: Trade wars, sanctions, major market moves
- **US Foreign Policy**: US involvement in global affairs

## How to Research

Use **web_search** to find current global news:

```bash
# Search for major world news
web_search "world news today BBC Reuters AP"
web_search "Israel Gaza war latest news"
web_search "Ukraine Russia war updates"
web_search "major global events today"
```

## Sources to Check

1. **BBC News World** - https://www.bbc.com/news/world
2. **Reuters World** - https://www.reuters.com/world/
3. **AP News World** - https://apnews.com/hub/world-news
4. **Al Jazeera** - https://www.aljazeera.com/news/
5. **The Guardian World** - https://www.theguardian.com/world

## What to Look For

- Breaking news (last 24 hours)
- Ongoing conflicts (Israel-Gaza, Ukraine-Russia)
- Major diplomatic developments
- Natural disasters
- Terrorism or security incidents
- Economic crises or sanctions

## Output Format

Save to: `/root/.openclaw/workspace/morning-briefing/data/global-news-YYYY-MM-DD.json`

```json
{
  "date": "2026-03-21",
  "category": "global-news",
  "headlines": [
    {
      "title": "Headline text",
      "summary": "2-3 sentence summary of the story",
      "source": "BBC News",
      "url": "https://...",
      "severity": "high|medium|low",
      "category": "war|politics|disaster|economy|other"
    }
  ],
  "top_story": {
    "title": "Most important story of the day",
    "summary": "Detailed summary",
    "why_it_matters": "Why this is significant"
  }
}
```

## Severity Guidelines

- **high**: Wars, major attacks, natural disasters, major political crises
- **medium**: Elections, sanctions, diplomatic tensions, protests
- **low**: General news, minor developments, cultural stories

## Process

1. Use web_search to find 5-10 major global stories
2. For each story, get the title, source, and a brief summary
3. Assign severity and category
4. Pick the most important as "top_story"
5. Save the JSON file
6. Report how many stories found
