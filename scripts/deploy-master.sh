#!/bin/bash
# Master Morning Briefing Deployment Script
# This script ensures GITHUB_TOKEN is available and deploys the briefing

set -e

# Load GitHub token from environment or .bashrc
source ~/.bashrc 2>/dev/null || true
export GITHUB_TOKEN="${GITHUB_TOKEN:-}"

DATE=$(date +%Y-%m-%d)
BRIEFING_DIR="/root/.openclaw/workspace/morning-briefing"

echo "🌅 Morning Briefing Deployment - $DATE"
echo "======================================"
echo ""

# Verify token is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ ERROR: GITHUB_TOKEN not set"
    exit 1
fi

echo "✅ GitHub token verified"
echo ""

cd "$BRIEFING_DIR"

# Step 1: Validate all data files exist
echo "📋 Checking data files..."
for category in global-news ai-news local-news sports-news events; do
    file="data/${category}-${DATE}.json"
    if [ ! -f "$file" ]; then
        echo "  ⚠️  Missing: $file"
    else
        echo "  ✅ Found: $file"
    fi
done
echo ""

# Step 2: Fix data structure issues (convert objects to arrays if needed)
echo "🔧 Validating data structures..."
python3 << 'EOF'
import json
import sys

date = "$(date +%Y-%m-%d)"

# Fix sports data if needed
sports_file = f"data/sports-news-{date}.json"
try:
    with open(sports_file, 'r') as f:
        data = json.load(f)
    
    if isinstance(data.get('teams'), dict):
        print(f"  Fixing sports data structure...")
        teams_array = []
        for key, team in data['teams'].items():
            team_data = {
                'name': team.get('name', 'Unknown Team'),
                'league': team.get('sport', team.get('league', 'Unknown')),
                'headlines': team.get('headlines', []),
                'details': {
                    'keyUpdates': team.get('keyUpdates', []),
                    'situation': team.get('situation', ''),
                    'playoffPicture': team.get('playoffPicture', ''),
                    'achievement': team.get('achievement', ''),
                    'today': team.get('today', ''),
                    'nextMatch': team.get('nextMatch', '')
                },
                'last_game': team.get('lastGame'),
                'next_game': team.get('nextGame')
            }
            teams_array.append(team_data)
        data['teams'] = teams_array
        
        with open(sports_file, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"  ✅ Sports data fixed")
except Exception as e:
    print(f"  ⚠️  Could not fix sports data: {e}")

print("  ✅ Data validation complete")
EOF
echo ""

# Step 3: Build the dashboard
echo "🔨 Building dashboard..."
node dashboard/build.js
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Build failed"
    exit 1
fi
echo "  ✅ Build successful"
echo ""

# Step 4: Configure git
echo "⚙️  Configuring git..."
git config user.name "OpenClaw Bot"
git config user.email "bot@openclaw.local"
echo "  ✅ Git configured"
echo ""

# Step 5: Commit changes
echo "💾 Committing changes..."
git add -A
git commit -m "Morning Briefing: $DATE" || echo "  No new changes to commit"
echo ""

# Step 6: Push to GitHub
echo "🚀 Deploying to GitHub Pages..."
git push "https://mango-codes:${GITHUB_TOKEN}@github.com/mango-codes/morning-briefing.git" main
if [ $? -eq 0 ]; then
    echo "  ✅ Deployed successfully!"
    echo ""
    echo "📰 Live at: https://mango-codes.github.io/morning-briefing/"
else
    echo "  ❌ ERROR: Push failed"
    exit 1
fi

echo ""
echo "✅ Morning Briefing deployment complete!"
