---
name: brief-qa
description: Quality assurance for morning briefing. Validates content integrity, fixes undefined headers, verifies all links navigate to correct source sites. Runs after Brief Manager to ensure polished deployment.
---

# Brief QA

Quality assurance agent for morning briefing. Ensures content is complete, accurate, and all links work.

## Responsibilities

### 1. Content Validation
- Check for "undefined" in headlines, titles, summaries
- Verify all sections have content (not empty)
- Ensure sports teams have proper names and leagues

### 2. Link Verification
- Test all "Read more" links return 200 status
- Verify links navigate to actual source sites (BBC, Reuters, etc.)
- Flag broken or redirecting links

### 3. Data Structure Validation
- Confirm sports.teams is array with proper structure
- Verify events has today and this_weekend arrays
- Check all required fields exist

### 4. Auto-Fix Issues
- Replace "undefined" with placeholder or remove
- Fix malformed URLs
- Correct data structure issues

## Process

```
1. Load all data files for today
2. Check each headline/title for "undefined"
3. Verify each URL with HTTP request
4. Check sports team structure
5. Fix any issues found
6. Rebuild and redeploy if fixes made
7. Report QA results
```

## Link Verification

Test each URL:
```python
import requests

def check_url(url):
    try:
        response = requests.head(url, timeout=10, allow_redirects=True)
        return response.status_code == 200
    except:
        return False
```

## Auto-Fix Rules

**If "undefined" found:**
- Replace with "[Content pending]" or remove item
- Log which item was fixed

**If broken link:**
- Try to find alternative source
- Or remove link but keep text
- Log broken URL

**If sports structure wrong:**
- Convert object → array
- Ensure all teams have name, league, headlines

## Output

Report to user:
- Number of issues found
- Number of issues fixed
- Any broken links that couldn't be fixed
- Final QA status: PASSED or NEEDS_REVIEW
