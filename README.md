# AI Alibis: Multi-Agent LLM Murder Mystery
<div align="center">
<img alt="Ai Alibis Logo" src="https://raw.githubusercontent.com/ironman5366/ai-murder-mystery-hackathon/actually_playable/web/src/assets/screenshot.png" max-width="80%">
</div>

## Setup
1. Git clone the repo
```
git clone https://github.com/ironman5366/ai-murder-mystery-hackathon.git
cd ai-murder-mystery-hackathon
```
2. Add your Anthropic API and PostgreSQL DB to api/.env file
```
nano api/.env
export ANTHROPIC_API_KEY="YOUR_API_KEY_HERE"
export DB_CONN_URL="postgresql://link_to_db_conn"
(<ctrl+x , y, enter> to save changes and exit nano)
```
3. Install Node dependencies
```
web/npm i
```
3. Start up the api
```
bash api_start.sh
```
4. In separate terminal, start up the web interface
```
bash web_start.sh
```
5. Play the game
