#!/bin/bash
# Rebuild and deploy dashboard after research completes

set -e

BRIEFING_DIR="/root/.openclaw/workspace/morning-briefing"
DATE=$(date +%Y-%m-%d)

echo "🔨 Rebuilding dashboard for $DATE..."

cd "$BRIEFING_DIR"

# Build the dashboard
node dashboard/build.js

# Commit and push to GitHub
git add dist/
git commit -m "Update dashboard with research data for $DATE" || echo "No changes to commit"
git push origin main

echo "✅ Dashboard updated and deployed!"
