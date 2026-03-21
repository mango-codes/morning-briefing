const fs = require('fs');
const path = require('path');

// Template for the HTML dashboard
const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morning Briefing - {{DATE}}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            padding: 2rem;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 2rem;
            color: white;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
        }
        .card {
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }
        .card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #e5e7eb;
        }
        .card-icon {
            font-size: 1.5rem;
        }
        .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1a1a2e;
        }
        .news-item {
            padding: 0.75rem 0;
            border-bottom: 1px solid #f3f4f6;
        }
        .news-item:last-child {
            border-bottom: none;
        }
        .news-title {
            font-weight: 600;
            color: #1a1a2e;
            margin-bottom: 0.25rem;
        }
        .news-summary {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.4;
            margin-bottom: 0.5rem;
        }
        .news-meta {
            font-size: 0.8rem;
            color: #999;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .read-more {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.85rem;
        }
        .read-more:hover {
            text-decoration: underline;
        }
        .severity-high {
            border-left: 4px solid #ef4444;
            padding-left: 0.75rem;
        }
        .severity-medium {
            border-left: 4px solid #f59e0b;
            padding-left: 0.75rem;
        }
        .severity-low {
            border-left: 4px solid #10b981;
            padding-left: 0.75rem;
        }
        .restaurant-card {
            background: #f9fafb;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.75rem;
        }
        .restaurant-name {
            font-weight: 700;
            color: #1a1a2e;
        }
        .restaurant-meta {
            font-size: 0.9rem;
            color: #666;
            margin: 0.25rem 0;
        }
        .vibe-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            margin-top: 0.5rem;
        }
        .vibe-tag {
            background: #fef3c7;
            color: #92400e;
            padding: 0.15rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
        }
        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            border: none;
            cursor: pointer;
        }
        .btn-primary {
            background: #10b981;
            color: white;
        }
        .btn-primary:hover {
            background: #059669;
        }
        .empty-state {
            text-align: center;
            color: #999;
            padding: 2rem;
        }
        .weather-widget {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1rem;
        }
        footer {
            text-align: center;
            margin-top: 3rem;
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🌅 Morning Briefing</h1>
            <p class="subtitle">{{DAY_OF_WEEK}}, {{DATE_DISPLAY}}</p>
        </header>
        
        <div class="dashboard-grid">
            {{CARDS}}
        </div>
        
        <footer>
            <p>Updated daily at 7:00 AM PT · Your personal morning dashboard</p>
        </footer>
    </div>
</body>
</html>`;

function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatDayOfWeek(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

function loadData(dateStr) {
    const dataDir = path.join(__dirname, '..', 'data');
    const data = {};
    
    const categories = ['global-news', 'ai-news', 'local-news', 'sports-news', 'restaurants', 'events'];
    
    for (const category of categories) {
        const filePath = path.join(dataDir, `${category}-${dateStr}.json`);
        if (fs.existsSync(filePath)) {
            data[category] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    }
    
    return data;
}

function generateGlobalNewsCard(data) {
    if (!data || !data.headlines) {
        return generateEmptyCard('🌍 Global News', 'Global news will appear here');
    }
    
    const headlinesHtml = data.headlines.slice(0, 5).map(h => `
        <div class="news-item severity-${h.severity || 'medium'}">
            <div class="news-title">${h.title}</div>
            <div class="news-summary">${h.summary}</div>
            <div class="news-meta">
                <span>${h.source} · ${h.category}</span>
                <a href="${h.url || '#'}" class="read-more" target="_blank">Read more →</a>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">🌍</span>
                <span class="card-title">Global News</span>
            </div>
            ${headlinesHtml}
        </div>
    `;
}

function generateAINewsCard(data) {
    if (!data || !data.headlines) {
        return generateEmptyCard('🤖 AI News', 'AI news will appear here');
    }
    
    const headlinesHtml = data.headlines.slice(0, 5).map(h => `
        <div class="news-item">
            <div class="news-title">${h.title}</div>
            <div class="news-summary">${h.summary}</div>
            <div class="news-meta">
                <span>${h.source} · ${h.type || 'news'}</span>
                <a href="${h.url || '#'}" class="read-more" target="_blank">Read more →</a>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">🤖</span>
                <span class="card-title">AI News</span>
            </div>
            ${headlinesHtml}
        </div>
    `;
}

function generateLocalNewsCard(data) {
    if (!data || !data.headlines) {
        return generateEmptyCard('📰 Local News', 'Seattle news will appear here');
    }
    
    const weather = data.weather || {};
    const weatherHtml = weather.forecast ? `
        <div class="weather-widget">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🌤️ ${weather.conditions}</div>
            <div style="font-size: 2rem; font-weight: bold;">${weather.high}° / ${weather.low}°</div>
            <div style="opacity: 0.9; margin-top: 0.5rem;">${weather.forecast}</div>
        </div>
    ` : '';
    
    const headlinesHtml = data.headlines.slice(0, 4).map(h => `
        <div class="news-item">
            <div class="news-title">${h.title}</div>
            <div class="news-summary">${h.summary}</div>
            <div class="news-meta">
                <span>${h.source} · ${h.category || 'news'}</span>
                <a href="${h.url || '#'}" class="read-more" target="_blank">Read more →</a>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">📰</span>
                <span class="card-title">Seattle News</span>
            </div>
            ${weatherHtml}
            ${headlinesHtml}
        </div>
    `;
}

function generateSportsNewsCard(data) {
    if (!data || !data.teams) {
        return generateEmptyCard('⚽ Sports', 'Sports news will appear here');
    }
    
    const teamsHtml = data.teams.map(team => {
        const headline = team.headlines && team.headlines[0] ? team.headlines[0] : null;
        const lastGame = team.last_game;
        const nextGame = team.next_game;
        
        let gameInfo = '';
        if (lastGame) {
            gameInfo += `<div style="font-size: 0.85rem; color: #10b981; margin-top: 0.25rem;">✓ Last: ${lastGame.result} vs ${lastGame.opponent}</div>`;
        }
        if (nextGame) {
            gameInfo += `<div style="font-size: 0.85rem; color: #3b82f6; margin-top: 0.25rem;">→ Next: ${nextGame.date} vs ${nextGame.opponent}</div>`;
        }
        
        return `
            <div class="team-section" style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f3f4f6;">
                <div style="font-weight: 700; color: #1a1a2e; margin-bottom: 0.25rem;">${team.name} <span style="font-size: 0.8rem; color: #666; font-weight: 400;">(${team.league})</span></div>
                ${headline ? `<div style="font-size: 0.9rem; color: #333; margin-bottom: 0.25rem;">${headline.title}</div>` : ''}
                ${gameInfo}
                ${headline && headline.url ? `<a href="${headline.url}" class="read-more" target="_blank">Read more →</a>` : ''}
            </div>
        `;
    }).join('');
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">⚽</span>
                <span class="card-title">Seattle Sports</span>
            </div>
            ${teamsHtml}
        </div>
    `;
}

function generateRestaurantsCard(data) {
    if (!data || !data.restaurants) {
        return generateEmptyCard('🍽️ Dinner Ideas', 'Restaurant recommendations will appear here');
    }
    
    const restaurantsHtml = data.restaurants.slice(0, 4).map(r => `
        <div class="restaurant-card">
            <div class="restaurant-name">${r.name}</div>
            <div class="restaurant-meta">${r.neighborhood} · ${r.cuisine} · ${r.price}</div>
            <div class="vibe-tags">
                ${(r.vibes || []).map(v => `<span class="vibe-tag">${v}</span>`).join('')}
            </div>
            <a href="${r.reservationUrl}" class="btn btn-primary" target="_blank">Check Availability</a>
        </div>
    `).join('');
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">🍽️</span>
                <span class="card-title">Dinner Ideas</span>
            </div>
            ${restaurantsHtml}
        </div>
    `;
}

function generateEventsCard(data) {
    if (!data || !data.today) {
        return generateEmptyCard('🎭 Events', 'Today\'s events will appear here');
    }
    
    const eventsHtml = data.today.slice(0, 5).map(e => `
        <div class="news-item">
            <div class="news-title">${e.title}</div>
            <div class="news-summary">${e.description || ''}</div>
            <div class="news-meta">
                <span>${e.time || ''} · ${e.venue || ''} · ${e.price || ''}</span>
            </div>
            ${e.url ? `<a href="${e.url}" class="btn btn-primary" target="_blank">Get Tickets</a>` : ''}
        </div>
    `).join('');
    
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-icon">🎭</span>
                <span class="card-title">Today's Events</span>
            </div>
            ${eventsHtml}
        </div>
    `;
}

function generateEmptyCard(title, message) {
    return `
        <div class="card">
            <div class="card-header">
                <span class="card-title">${title}</span>
            </div>
            <div class="empty-state">${message}</div>
        </div>
    `;
}

function build() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const data = loadData(dateStr);
    
    const cards = [
        generateGlobalNewsCard(data['global-news']),
        generateAINewsCard(data['ai-news']),
        generateLocalNewsCard(data['local-news']),
        generateSportsNewsCard(data['sports-news']),
        generateRestaurantsCard(data['restaurants']),
        generateEventsCard(data['events'])
    ].join('\n');
    
    let html = template
        .replace('{{DATE}}', dateStr)
        .replace('{{DATE_DISPLAY}}', formatDate(today))
        .replace('{{DAY_OF_WEEK}}', formatDayOfWeek(today))
        .replace('{{CARDS}}', cards);
    
    const distPath = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }
    
    fs.writeFileSync(path.join(distPath, 'index.html'), html);
    
    console.log(`✅ Built morning briefing for ${dateStr}`);
}

build();
