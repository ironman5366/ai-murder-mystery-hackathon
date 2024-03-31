# AI Alibis: Multi-Agent LLM Murder Mystery
<div align="center">
<img alt="Ai Alibis Logo" src="https://raw.githubusercontent.com/ironman5366/ai-murder-mystery-hackathon/actually_playable/web/src/assets/screenshot.png" height="400px">
</div>

## Setup
1. Git clone the repo
```
git clone https://github.com/ironman5366/ai-murder-mystery-hackathon.git
cd ai-murder-mystery-hackathon
```
2. Create venv and install its python packages
```
bash setup.sh
```
3. Add your Anthropic API to web/.env file
```
nano web/.env
export ANTHROPIC_API_KEY="YOUR_API_KEY_HERE"
(<ctrl+x , y, enter> to save changes and exit nano)
```
4. Start up the api
```
bash api_start.sh
```
5. In separate terminal, start up the web interface
```
bash web_start.sh
```
6. Play the game
