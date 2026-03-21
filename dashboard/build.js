const fs = require('fs');
const path = require('path');

// Classic Newspaper Template
const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Morning Briefing - {{DATE}}</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Libre+Franklin:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Libre Franklin', Georgia, serif;
            background: #f5f5f0;
            color: #1a1a1a;
            line-height: 1.6;
        }
        
        .newspaper {
            max-width: 1200px;
            margin: 0 auto;
            background: #fff;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        /* Masthead */
        .masthead {
            text-align: center;
            padding: 2rem 1rem 1rem;
            border-bottom: 3px double #1a1a1a;
            background: #fff;
        }
        
        .masthead-title {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 4rem;
            font-weight: 900;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            color: #1a1a1a;
        }
        
        .masthead-subtitle {
            font-family: 'Libre Franklin', sans-serif;
            font-size: 0.9rem;
            font-weight: 300;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #666;
            margin-bottom: 1rem;
        }
        
        .masthead-date {
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            border-top: 1px solid #1a1a1a;
            border-bottom: 1px solid #1a1a1a;
            padding: 0.5rem;
            display: inline-block;
        }
        
        /* Main Content */
        .content {
            padding: 2rem;
        }
        
        /* Section Headers */
        .section-header {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #1a1a1a;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
            margin-top: 2rem;
        }
        
        .section-header:first-child {
            margin-top: 0;
        }
        
        /* Article Cards */
        .article {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #ddd;
        }
        
        .article:last-child {
            border-bottom: none;
        }
        
        .article-headline {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 1.3;
            margin-bottom: 0.5rem;
            color: #1a1a1a;
        }
        
        .article-headline a {
            color: inherit;
            text-decoration: none;
        }
        
        .article-headline a:hover {
            text-decoration: underline;
        }
        
        .article-deck {
            font-size: 1rem;
            color: #444;
            margin-bottom: 0.75rem;
            font-weight: 400;
        }
        
        .article-meta {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #666;
            margin-bottom: 0.5rem;
        }
        
        .article-body {
            font-size: 0.95rem;
            line-height: 1.7;
            color: #333;
        }
        
        /* Breaking/Important News */
        .breaking {
            background: #1a1a1a;
            color: #fff;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .breaking-label {
            font-family: 'Libre Franklin', sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #ff6b6b;
            margin-bottom: 0.5rem;
        }
        
        .breaking-headline {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 0.75rem;
        }
        
        .breaking-headline a {
            color: #fff;
            text-decoration: none;
        }
        
        .breaking-headline a:hover {
            text-decoration: underline;
        }
        
        .breaking .article-body {
            color: #e0e0e0;
            font-size: 1rem;
            line-height: 1.7;
        }
        
        /* Weather Box */
        .weather-box {
            background: #f9f9f9;
            border: 1px solid #ddd;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .weather-temp {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
        }
        
        .weather-condition {
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 0.5rem 0;
        }
        
        .weather-forecast {
            font-size: 0.9rem;
            color: #666;
        }
        
        /* Sports Section */
        .sports-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .sports-team {
            border: 1px solid #ddd;
            padding: 1rem;
        }
        
        .sports-team-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            font-weight: 700;
            border-bottom: 1px solid #1a1a1a;
            padding-bottom: 0.5rem;
            margin-bottom: 0.75rem;
        }
        
        .sports-score {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .sports-upcoming {
            font-size: 0.85rem;
            color: #666;
            font-style: italic;
        }
        
        /* Listings (Restaurants/Events) */
        .listing {
            border-bottom: 1px dotted #999;
            padding: 1rem 0;
        }
        
        .listing:last-child {
            border-bottom: none;
        }
        
        .listing-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.25rem;
        }
        
        .listing-meta {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 0.5rem;
        }
        
        .listing-desc {
            font-size: 0.9rem;
            color: #444;
            margin-bottom: 0.75rem;
        }
        
        .btn {
            display: inline-block;
            font-family: 'Libre Franklin', sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 0.5rem 1rem;
            background: #1a1a1a;
            color: #fff;
            text-decoration: none;
            border: 2px solid #1a1a1a;
        }
        
        .btn:hover {
            background: #fff;
            color: #1a1a1a;
        }
        
        /* Read More Link */
        .read-more {
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #1a1a1a;
            text-decoration: none;
            border-bottom: 1px solid #1a1a1a;
        }
        
        .read-more:hover {
            border-bottom: 2px solid #1a1a1a;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 2rem;
            border-top: 3px double #1a1a1a;
            font-size: 0.8rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        
        /* Two Column Layout */
        .two-column {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
        }
        
        @media (max-width: 768px) {
            .masthead-title {
                font-size: 2.5rem;
            }
            .two-column {
                grid-template-columns: 1fr;
            }
            .sports-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="newspaper">
        <header class="masthead">
            <div class="masthead-subtitle">Your Personal Morning Dashboard</div>
            <h1 class="masthead-title">The Morning Briefing</h1>
            <div class="masthead-date">{{DAY_OF_WEEK}}, {{DATE_DISPLAY}}</div>
        </header>
        
        <main class="content">
            {{CONTENT}}
        </main>
        
        <footer class="footer">
            Updated Daily at 7:00 AM PT · Seattle, Washington
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

function generateBreakingNews(data) {
    if (!data || !data.headlines || data.headlines.length === 0) {
        return '';
    }
    
    const topStory = data.headlines[0];
    
    return `
        <div class="breaking">
            <div class="breaking-label">Top Story</div>
            <h2 class="breaking-headline">
                <a href="${topStory.url || '#'}" target="_blank">${topStory.title}</a>
            </h2>
            <p class="article-body">${topStory.summary}</p>
            <p style="margin-top: 1rem;">
                <a href="${topStory.url || '#'}" class="read-more" target="_blank">Read Full Story →</a>
            </p>
        </div>
    `;
}

function generateNewsSection(title, data, limit = 5) {
    if (!data || !data.headlines) {
        return '';
    }
    
    const articlesHtml = data.headlines.slice(0, limit).map(h => `
        <article class="article">
            <h3 class="article-headline">
                <a href="${h.url || '#'}" target="_blank">${h.title}</a>
            </h3>
            <p class="article-body">${h.summary}</p>
            <p class="article-meta">
                ${h.source} · ${h.category || 'News'} · 
                <a href="${h.url || '#'}" class="read-more" target="_blank">Read more</a>
            </p>
        </article>
    `).join('');
    
    return `
        <section>
            <h2 class="section-header">${title}</h2>
            ${articlesHtml}
        </section>
    `;
}

function generateLocalSection(data) {
    if (!data || !data.headlines) {
        return '';
    }
    
    const weather = data.weather || {};
    const weatherHtml = weather.forecast ? `
        <div class="weather-box">
            <div class="weather-temp">${weather.high}° / ${weather.low}°</div>
            <div class="weather-condition">${weather.conditions}</div>
            <div class="weather-forecast">${weather.forecast}</div>
        </div>
    ` : '';
    
    const articlesHtml = data.headlines.slice(0, 4).map(h => `
        <article class="article">
            <h3 class="article-headline">
                <a href="${h.url || '#'}" target="_blank">${h.title}</a>
            </h3>
            <p class="article-body">${h.summary}</p>
            <p class="article-meta">
                ${h.source} · 
                <a href="${h.url || '#'}" class="read-more" target="_blank">Read more</a>
            </p>
        </article>
    `).join('');
    
    return `
        <section>
            <h2 class="section-header">Seattle News</h2>
            ${weatherHtml}
            ${articlesHtml}
        </section>
    `;
}

function generateSportsSection(data) {
    if (!data || !data.teams) {
        return '';
    }
    
    const teamsHtml = data.teams.map(team => {
        const headline = team.headlines && team.headlines[0] ? team.headlines[0] : null;
        const lastGame = team.last_game;
        const nextGame = team.next_game;
        
        return `
            <div class="sports-team">
                <div class="sports-team-name">${team.name}</div>
                ${headline ? `<p style="margin-bottom: 0.5rem;"><a href="${headline.url || '#'}" style="color: inherit; text-decoration: none;">${headline.title}</a></p>` : ''}
                ${lastGame ? `<div class="sports-score">Last: ${lastGame.result} vs ${lastGame.opponent}</div>` : ''}
                ${nextGame ? `<div class="sports-upcoming">Next: ${nextGame.date} vs ${nextGame.opponent}</div>` : ''}
                ${headline && headline.url ? `<p style="margin-top: 0.75rem;"><a href="${headline.url}" class="read-more" target="_blank">Read more</a></p>` : ''}
            </div>
        `;
    }).join('');
    
    return `
        <section>
            <h2 class="section-header">Sports</h2>
            <div class="sports-grid">
                ${teamsHtml}
            </div>
        </section>
    `;
}

function generateListingsSection(title, data, type) {
    if (!data) {
        return '';
    }
    
    let items = [];
    if (type === 'restaurants' && data.restaurants) {
        items = data.restaurants.slice(0, 4);
    } else if (type === 'events' && data.today) {
        items = data.today.slice(0, 5);
    }
    
    if (items.length === 0) {
        return '';
    }
    
    const listingsHtml = items.map(item => {
        if (type === 'restaurants') {
            return `
                <div class="listing">
                    <div class="listing-title">${item.name}</div>
                    <div class="listing-meta">${item.neighborhood} · ${item.cuisine} · ${item.price}</div>
                    <div class="listing-desc">${item.whyFun || ''}</div>
                    <a href="${item.reservationUrl}" class="btn" target="_blank">Reserve Table</a>
                </div>
            `;
        } else {
            return `
                <div class="listing">
                    <div class="listing-title">${item.title}</div>
                    <div class="listing-meta">${item.time || ''} · ${item.venue || ''} · ${item.price || ''}</div>
                    <div class="listing-desc">${item.description || ''}</div>
                    ${item.url ? `<a href="${item.url}" class="btn" target="_blank">Get Tickets</a>` : ''}
                </div>
            `;
        }
    }).join('');
    
    return `
        <section>
            <h2 class="section-header">${title}</h2>
            ${listingsHtml}
        </section>
    `;
}

function build() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const data = loadData(dateStr);
    
    // Build content sections
    let content = '';
    
    // Top Story / Breaking News
    if (data['global-news']) {
        content += generateBreakingNews(data['global-news']);
    }
    
    // Two column layout for main content
    content += '<div class="two-column">';
    
    // Left column - News
    content += '<div class="left-column">';
    content += generateNewsSection('World News', data['global-news'], 4);
    content += generateLocalSection(data['local-news']);
    content += '</div>';
    
    // Right column - AI, Sports, Listings
    content += '<div class="right-column">';
    content += generateNewsSection('Technology', data['ai-news'], 4);
    content += generateSportsSection(data['sports-news']);
    content += '</div>';
    
    content += '</div>';
    
    // Full width sections
    content += generateListingsSection('Dining', data['restaurants'], 'restaurants');
    content += generateListingsSection('Events Today', data['events'], 'events');
    
    // Fill template
    let html = template
        .replace('{{DATE}}', dateStr)
        .replace('{{DATE_DISPLAY}}', formatDate(today))
        .replace('{{DAY_OF_WEEK}}', formatDayOfWeek(today))
        .replace('{{CONTENT}}', content);
    
    // Write file
    const distPath = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }
    
    fs.writeFileSync(path.join(distPath, 'index.html'), html);
    
    console.log(`✅ Built newspaper-style morning briefing for ${dateStr}`);
}

build();
