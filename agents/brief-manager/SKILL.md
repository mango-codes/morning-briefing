---
name: brief-manager
description: Oversee the morning briefing research agents and ensure successful deployment. Validates all research completed, handles errors, and deploys to GitHub. Use as the master coordinator for the daily morning briefing.
---

# Brief Manager

Master coordinator for the morning briefing. Ensures all research agents complete successfully and deployment works.

## Responsibilities

1. **Validate Research Completion**
   - Check all 5 data files exist for today's date
   - Verify each file has valid content (not empty, correct structure)
   - Re-run any failed agents

2. **Fix Data Structure Issues**
   - Convert sports data from object → array if needed
   - Ensure events use correct field names (today/this_weekend)
   - Validate all JSON is parseable

3. **Deploy to GitHub**
   - Build dashboard
   - Commit and push
   - Verify deployment succeeded

4. **Error Recovery**
   - If deployment fails, retry with fixes
   - Use GITHUB_TOKEN from environment variable
   - Never claim "can't deploy" - the token works when set

## Process

```
1. Check data files for YYYY-MM-DD:
   - global-news-YYYY-MM-DD.json
   - ai-news-YYYY-MM-DD.json
   - local-news-YYYY-MM-DD.json
   - sports-news-YYYY-MM-DD.json
   - events-YYYY-MM-DD.json

2. For each missing/invalid file:
   - Spawn research agent to create it
   - Wait for completion

3. Fix data structures:
   - Sports: ensure teams is array
   - Events: ensure has today and this_weekend

4. Deploy:
   - cd /root/.openclaw/workspace/morning-briefing
   - GITHUB_TOKEN must be set as environment variable
   - bash scripts/deploy-master.sh

5. Verify:
   - Check GitHub Pages is updated
   - Report success with URL
```

## Error Handling

**If deployment fails:**
- DO NOT say "I can't deploy"
- DO check: Is GITHUB_TOKEN environment variable set?
- DO check: Are data files valid?
- DO retry with explicit token export
- DO fix any data structure issues

**Historical fixes that work:**
- Sports teams as object → convert to array
- Missing GITHUB_TOKEN → export it explicitly
- Port conflicts → use deploy-master.sh which handles this

## Output

Report to user:
- Which agents ran
- Any issues fixed
- Deployment status
- Live URL
