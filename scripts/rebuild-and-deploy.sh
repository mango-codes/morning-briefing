#!/bin/bash
# Rebuild and deploy dashboard after research completes

set -e

# Load environment variables from .bashrc
source ~/.bashrc 2>/dev/null || true

BRIEFING_DIR="/root/.openclaw/workspace/morning-briefing"
DATE=$(date +%Y-%m-%d)
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# If still not set, try to load directly
if [ -z "$GITHUB_TOKEN" ]; then
    # Extract token from .bashrc
    GITHUB_TOKEN=$(grep "export GITHUB_TOKEN=" ~/.bashrc 2>/dev/null | head -1 | sed 's/export GITHUB_TOKEN="\(.*\)"/\1/')
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable not set"
    echo "   Please set it in ~/.bashrc: export GITHUB_TOKEN=your_token"
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
