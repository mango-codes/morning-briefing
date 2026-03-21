#!/bin/bash
# Rebuild and deploy dashboard after research completes

set -e

BRIEFING_DIR="/root/.openclaw/workspace/morning-briefing"
DATE=$(date +%Y-%m-%d)
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable not set"
    exit 1
fi

echo "🔨 Rebuilding dashboard for $DATE..."

cd "$BRIEFING_DIR"

# Build the dashboard
node dashboard/build.js

# Configure git
git config user.name "OpenClaw Bot"
git config user.email "bot@openclaw.local"

# Commit changes
git add dist/
git commit -m "Update dashboard with research data for $DATE" || echo "No changes to commit"

# Push using token
git push "https://mango-codes:${GITHUB_TOKEN}@github.com/mango-codes/morning-briefing.git" main

echo "✅ Dashboard updated and deployed!"
