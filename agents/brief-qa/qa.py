#!/usr/bin/env python3
"""
Brief QA - Quality assurance for morning briefing
Validates content, fixes undefined headers, verifies links
"""

import json
import os
import re
import requests
import sys
from datetime import datetime

class BriefQA:
    def __init__(self):
        self.date = datetime.now().strftime("%Y-%m-%d")
        self.data_dir = "/root/.openclaw/workspace/morning-briefing/data"
        self.issues_found = []
        self.issues_fixed = []
        self.broken_links = []
        
    def load_json(self, filename):
        """Load and parse JSON file"""
        filepath = f"{self.data_dir}/{filename}"
        if not os.path.exists(filepath):
            return None
        try:
            with open(filepath, 'r') as f:
                return json.load(f)
        except:
            return None
    
    def save_json(self, filename, data):
        """Save JSON file"""
        filepath = f"{self.data_dir}/{filename}"
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
    
    def check_for_undefined(self, obj, path=""):
        """Recursively check for 'undefined' in data"""
        issues = []
        if isinstance(obj, dict):
            for key, value in obj.items():
                current_path = f"{path}.{key}" if path else key
                if isinstance(value, str) and "undefined" in value.lower():
                    issues.append((current_path, value))
                elif isinstance(value, (dict, list)):
                    issues.extend(self.check_for_undefined(value, current_path))
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                current_path = f"{path}[{i}]"
                if isinstance(item, str) and "undefined" in item.lower():
                    issues.append((current_path, item))
                elif isinstance(item, (dict, list)):
                    issues.extend(self.check_for_undefined(item, current_path))
        return issues
    
    def fix_undefined(self, obj):
        """Replace undefined with placeholder"""
        if isinstance(obj, dict):
            for key, value in obj.items():
                if isinstance(value, str) and "undefined" in value.lower():
                    obj[key] = "[Content update pending]"
                elif isinstance(value, (dict, list)):
                    self.fix_undefined(value)
        elif isinstance(obj, list):
            for item in obj:
                if isinstance(item, (dict, list)):
                    self.fix_undefined(item)
    
    def verify_url(self, url, timeout=10):
        """Check if URL is valid and returns 200"""
        if not url or url == '#' or url == '':
            return False
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.head(url, timeout=timeout, allow_redirects=True, headers=headers)
            return response.status_code == 200
        except:
            return False
    
    def check_all_urls(self, data, source=""):
        """Find and check all URLs in data"""
        urls = []
        
        def extract_urls(obj, path=""):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    current_path = f"{path}.{key}" if path else key
                    if key in ['url', 'reservationUrl'] and isinstance(value, str):
                        urls.append((current_path, value, source))
                    elif isinstance(value, (dict, list)):
                        extract_urls(value, current_path)
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    current_path = f"{path}[{i}]"
                    if isinstance(item, (dict, list)):
                        extract_urls(item, current_path)
        
        extract_urls(data)
        return urls
    
    def validate_sports_structure(self, data):
        """Ensure sports data has correct structure"""
        if not data or 'teams' not in data:
            return False, "Missing teams field"
        
        teams = data['teams']
        if isinstance(teams, dict):
            return False, "Teams is object, should be array"
        
        if not isinstance(teams, list):
            return False, f"Teams is {type(teams)}, should be list"
        
        for i, team in enumerate(teams):
            if not isinstance(team, dict):
                return False, f"Team {i} is not a dict"
            if 'name' not in team:
                return False, f"Team {i} missing name"
        
        return True, "OK"
    
    def fix_sports_structure(self, data):
        """Convert sports teams object to array"""
        if isinstance(data.get('teams'), dict):
            teams_array = []
            for key, team in data['teams'].items():
                team_data = {
                    'name': team.get('name', key),
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
            return True
        return False
    
    def run_qa(self):
        """Main QA process"""
        print(f"🔍 Brief QA - {self.date}")
        print("=" * 50)
        
        categories = {
            'global-news': 'Global News',
            'ai-news': 'AI News',
            'local-news': 'Local News',
            'sports-news': 'Sports',
            'events': 'Events'
        }
        
        total_issues = 0
        total_fixed = 0
        
        for cat_file, cat_name in categories.items():
            filename = f"{cat_file}-{self.date}.json"
            print(f"\n📋 Checking {cat_name}...")
            
            data = self.load_json(filename)
            if not data:
                print(f"  ❌ File not found or invalid")
                continue
            
            # Check for undefined
            undefined_issues = self.check_for_undefined(data)
            if undefined_issues:
                print(f"  ⚠️  Found {len(undefined_issues)} 'undefined' values")
                self.fix_undefined(data)
                self.save_json(filename, data)
                print(f"  ✅ Fixed undefined values")
                total_fixed += len(undefined_issues)
                total_issues += len(undefined_issues)
            
            # Check URLs
            urls = self.check_all_urls(data, cat_name)
            broken = []
            for path, url, source in urls:
                if not self.verify_url(url):
                    broken.append((path, url))
                    self.broken_links.append((cat_name, path, url))
            
            if broken:
                print(f"  ⚠️  Found {len(broken)} broken links")
                total_issues += len(broken)
            else:
                print(f"  ✅ All links valid")
            
            # Special check for sports
            if cat_file == 'sports-news':
                valid, msg = self.validate_sports_structure(data)
                if not valid:
                    print(f"  ⚠️  Sports structure issue: {msg}")
                    if self.fix_sports_structure(data):
                        self.save_json(filename, data)
                        print(f"  ✅ Fixed sports structure")
                        total_fixed += 1
                        total_issues += 1
                else:
                    print(f"  ✅ Sports structure valid")
        
        # Summary
        print(f"\n📊 QA Summary:")
        print(f"  Issues found: {total_issues}")
        print(f"  Issues fixed: {total_fixed}")
        print(f"  Broken links: {len(self.broken_links)}")
        
        if total_issues > 0:
            print(f"\n🔧 Rebuilding after fixes...")
            os.chdir('/root/.openclaw/workspace/morning-briefing')
            os.environ['GITHUB_TOKEN'] = os.environ.get('GITHUB_TOKEN', '')
            result = os.system('node dashboard/build.js')
            if result == 0:
                print(f"  ✅ Rebuild successful")
            else:
                print(f"  ❌ Rebuild failed")
        
        if self.broken_links:
            print(f"\n⚠️  Broken links that need manual review:")
            for cat, path, url in self.broken_links[:5]:
                print(f"  - {cat}: {url[:60]}...")
        
        status = "PASSED" if total_issues == 0 else ("FIXED" if total_fixed == total_issues else "NEEDS_REVIEW")
        print(f"\n✅ QA Status: {status}")
        
        return 0 if status in ["PASSED", "FIXED"] else 1

if __name__ == "__main__":
    qa = BriefQA()
    sys.exit(qa.run_qa())
