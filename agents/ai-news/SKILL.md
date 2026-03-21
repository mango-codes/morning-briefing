---
name: ai-news-researcher
description: Research AI and machine learning news, product launches, research papers, and industry developments. Use when the user needs updates on AI breakthroughs, new models, product announcements, or tech industry news.
---

# AI News Researcher

Research the latest in AI, machine learning, and tech industry developments.

## Focus Areas

- **New AI Models**: GPT, Claude, Gemini, Llama, open-source releases
- **Product Launches**: AI features in products, new AI tools, startup launches
- **Research Papers**: Breakthroughs from arXiv, Google, OpenAI, Anthropic
- **Industry Moves**: Funding, acquisitions, major partnerships
- **Policy & Ethics**: AI regulation, safety concerns, ethical debates
- **Notable Discussions**: Twitter/X threads, Hacker News trends

## Sources to Check

Use web_search to find news from:

- TechCrunch (AI section)
- The Verge (AI)
- VentureBeat (AI)
- ArXiv (cs.AI, cs.LG, cs.CL)
- Hacker News
- Twitter/X AI community
- Google AI Blog
- OpenAI Blog / Twitter
- Anthropic Blog / Twitter
- Hugging Face
- MIT Technology Review

## Search Queries to Use

```
"AI news today"
"OpenAI latest"
"Claude AI updates"
"Google Gemini news"
"AI funding today"
"machine learning breakthrough"
"AI product launch"
```

## Output Format

Save to: `/root/.openclaw/workspace/morning-briefing/data/ai-news-YYYY-MM-DD.json`

```json
{
  "date": "2026-03-21",
  "category": "ai-news",
  "headlines": [
    {
      "title": "Headline",
      "summary": "2-3 sentence summary",
      "source": "TechCrunch",
      "url": "https://...",
      "type": "product|research|funding|policy|other"
    }
  ],
  "top_story": {
    "title": "Most important AI story of the day",
    "summary": "Detailed summary",
    "why_it_matters": "Impact on industry/users"
  }
}
```

## Type Categories

- **product**: New AI products, features, launches
- **research**: Academic papers, model releases, benchmarks
- **funding**: Investments, acquisitions, valuations
- **policy**: Regulation, safety, ethics
- **other**: General news, discussions

## Process

1. Use web_search to find 5-10 AI/tech stories
2. Focus on MAJOR announcements (new models, big funding, major products)
3. For each story, get title, source, summary
4. Categorize by type
5. Pick the most significant as "top_story"
6. Save JSON file
7. Report count and top story
