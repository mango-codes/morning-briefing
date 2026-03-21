---
name: ai-news-researcher
description: Research AI and machine learning news, product launches, research papers, and industry developments. Use when the user needs updates on AI breakthroughs, new models, product announcements, or tech industry news.
---

# AI News Researcher

Research the latest in AI, machine learning, and tech industry developments.

## Focus Areas

- **New Models**: GPT, Claude, Gemini, open-source releases
- **Product Launches**: AI features in products, new AI tools
- **Research Papers**: Breakthroughs from arXiv, major labs
- **Industry Moves**: Funding, acquisitions, policy changes
- **Notable Discussions**: Twitter/X threads, Hacker News, Reddit debates

## Sources to Check

- TechCrunch (AI section)
- The Verge (AI)
- VentureBeat (AI)
- arXiv (cs.AI, cs.LG, cs.CL)
- Hacker News
- Twitter/X AI community
- Google AI Blog
- OpenAI Blog
- Anthropic Blog
- Hugging Face

## Output Format

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
      "type": "product|research|policy|funding|other"
    }
  ],
  "top_story": {
    "title": "Most important AI story of the day",
    "summary": "Detailed summary",
    "why_it_matters": "Impact on industry/users"
  }
}
```
