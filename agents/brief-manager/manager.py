#!/usr/bin/env python3
"""
Brief Manager - Master coordinator for morning briefing
Validates research, fixes issues, deploys to GitHub
"""

import json
import os
import subprocess
import sys
from datetime import datetime

class BriefManager:
    def __init__(self):
        self.date = datetime.now().strftime("%Y-%m-%d")
        self.data_dir = "/root/.openclaw/workspace/morning-briefing/data"
        self.token = os.environ.get('GITHUB_TOKEN', '')
        
    def check_data_files(self):
        """Check if all data files exist and are valid"""
        categories = ['global-news', 'ai-news', 'local-news', 'sports-news', 'events']
        missing = []
        invalid = []
        
        for cat in categories:
            filepath = f"{self.data_dir}/{cat}-{self.date}.json"
            if not os.path.exists(filepath):
                missing.append(cat)
            else:
                # Check if valid JSON
                try:
                    with open(filepath, 'r') as f:
                        data = json.load(f)
                    # Check if empty
                    if not data:
                        invalid.append(cat)
                except:
                    invalid.append(cat)
        
        return missing, invalid
    
    def fix_sports_structure(self):
        """Fix sports data if teams is object instead of array"""
        filepath = f"{self.data_dir}/sports-news-{self.date}.json"
        if not os.path.exists(filepath):
            return False
        
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
            
            if isinstance(data.get('teams'), dict):
                print("  🔧 Fixing sports data structure (object → array)")
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
                
                with open(filepath, 'w') as f:
                    json.dump(data, f, indent=2)
                return True
        except Exception as e:
            print(f"  ⚠️  Could not fix sports: {e}")
        
        return False
    
    def deploy(self):
        """Deploy to GitHub Pages"""
        print("\n🚀 Deploying to GitHub...")
        
        # Export token explicitly
        env = os.environ.copy()
        env['GITHUB_TOKEN'] = self.token
        
        # Run deploy script
        result = subprocess.run(
            ['bash', '/root/.openclaw/workspace/morning-briefing/scripts/deploy-master.sh'],
            capture_output=True,
            text=True,
            env=env,
            cwd='/root/.openclaw/workspace/morning-briefing'
        )
        
        if result.returncode == 0:
            print("  ✅ Deployment successful!")
            return True
        else:
            print(f"  ❌ Deployment failed: {result.stderr}")
            return False
    
    def run(self):
        """Main coordination loop"""
        print(f"🌅 Brief Manager - {self.date}")
        print("=" * 50)
        
        # Step 1: Check data files
        print("\n📋 Checking data files...")
        missing, invalid = self.check_data_files()
        
        if missing:
            print(f"  ⚠️  Missing: {', '.join(missing)}")
            print("  Note: Research agents should populate these")
        else:
            print("  ✅ All data files present")
        
        if invalid:
            print(f"  ⚠️  Invalid: {', '.join(invalid)}")
        
        # Step 2: Fix data structures
        print("\n🔧 Validating data structures...")
        self.fix_sports_structure()
        
        # Step 3: Deploy
        if self.deploy():
            print("\n✅ Morning briefing deployed successfully!")
            print(f"📰 https://mango-codes.github.io/morning-briefing/")
            return 0
        else:
            print("\n❌ Deployment failed - retrying with explicit token...")
            # Retry with explicit token export
            os.environ['GITHUB_TOKEN'] = self.token
            if self.deploy():
                print("\n✅ Retry successful!")
                return 0
            else:
                print("\n❌ Retry failed")
                return 1

if __name__ == "__main__":
    manager = BriefManager()
    sys.exit(manager.run())
