#!/bin/bash
# Wrapper script to ensure GITHUB_TOKEN is available for deployments

# Load token from .bashrc
source ~/.bashrc 2>/dev/null || true
export GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# Run the actual deploy script
/root/.openclaw/workspace/morning-briefing/scripts/rebuild-and-deploy.sh "$@"
