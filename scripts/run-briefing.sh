#!/bin/bash
# Morning Briefing - Master orchestration script
# Runs at 7 AM PT to coordinate all research subagents

set -e

BRIEFING_DIR="/root/.openclaw/workspace/morning-briefing"
DATE=$(date +%Y-%m-%d)
DATA_DIR="$BRIEFING_DIR/data"

echo "🌅 Morning Briefing - $DATE"
echo "================================"
echo ""

# Create data directory
mkdir -p "$DATA_DIR"

echo "🤖 This script coordinates OpenClaw subagents."
echo "   Each subagent will research their domain and save results."
echo ""
echo "📋 Research tasks:"
echo "   1. 🌍 Global News"
echo "   2. 🤖 AI News"
echo "   3. 📰 Seattle Local News"
echo "   4. ⚽ Seattle Sports"
echo "   5. 🍽️ Restaurants"
echo "   6. 🎭 Events"
echo ""
echo "📁 Data will be saved to: $DATA_DIR"
echo ""
echo "Next: OpenClaw will spawn subagents for each category..."
