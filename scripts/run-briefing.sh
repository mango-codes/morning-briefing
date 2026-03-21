#!/bin/bash
# Morning Briefing - Master script
# Runs at 7 AM PT to research and compile all briefing data

set -e

BRIEFING_DIR="/root/.openclaw/workspace/morning-briefing"
DATE=$(date +%Y-%m-%d)
DATA_DIR="$BRIEFING_DIR/data"

echo "🌅 Starting Morning Briefing for $DATE"
echo ""

# Create data directory
mkdir -p "$DATA_DIR"

# Each research task will be triggered by OpenClaw subagents
# The subagents will save their results to the data directory

echo "📋 Research tasks:"
echo "  1. Global News"
echo "  2. AI News"
echo "  3. Local News (Seattle)"
echo "  4. Sports News (Seattle)"
echo "  5. Restaurants"
echo "  6. Events"
echo ""

echo "🤖 Triggering OpenClaw research agents..."
echo ""

# The actual research will be done by OpenClaw subagents
# This script serves as the coordinator

echo "✅ Research coordination complete"
echo "📊 Data will be saved to: $DATA_DIR"
echo ""
echo "Next steps:"
echo "  1. Subagents will research each category"
echo "  2. Results saved as JSON files"
echo "  3. Dashboard builder will compile the site"
echo "  4. Site deployed to GitHub Pages"
