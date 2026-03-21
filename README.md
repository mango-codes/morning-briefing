# 🌅 Morning Briefing

Your personal morning dashboard with news, sports, restaurants, and events — updated daily at 7 AM PT.

## What's Included

| Category | Description |
|----------|-------------|
| 🌍 **Global News** | Major world events, conflicts, geopolitics |
| 🤖 **AI News** | AI/ML breakthroughs, product launches, research |
| 📰 **Local News** | Seattle and Pacific Northwest news |
| ⚽ **Sports** | Mariners, Seahawks, Kraken, Sounders updates |
| 🍽️ **Restaurants** | Curated dinner recommendations |
| 🎭 **Events** | Concerts, shows, and happenings today |

## How It Works

1. **7:00 AM PT daily** — OpenClaw cron job triggers
2. **6 subagents research** their domains in parallel
3. **Data compiled** into a unified dashboard
4. **Site deployed** to GitHub Pages
5. **You wake up** to a fresh briefing

## Architecture

```
morning-briefing/
├── agents/
│   ├── global-news/      # World news research
│   ├── ai-news/          # AI/tech news
│   ├── local-news/       # Seattle news
│   ├── sports-news/      # Seattle sports
│   ├── restaurants/      # Dinner recommendations
│   └── events/           # Today's events
├── dashboard/
│   └── build.js          # Compiles all data into site
├── data/                 # JSON files from each agent
└── dist/                 # Generated site
```

## Agents

Each agent is a specialized subagent that:
- Researches its domain
- Outputs structured JSON
- Saves to `data/{category}-{date}.json`

## Dashboard

The dashboard combines all data into a clean, mobile-friendly interface with:
- Grid layout of all categories
- Severity indicators for news (high/medium/low)
- Direct links to sources
- Restaurant reservation links
- Event details with times/venues

## Deployment

- **GitHub Pages** hosts the site
- **GitHub Actions** can also trigger the build
- **OpenClaw cron** runs the research at 7 AM PT

## Customization

Edit `dashboard/build.js` to:
- Change the layout
- Add/remove categories
- Adjust the number of items shown
- Modify styling

## License

MIT
