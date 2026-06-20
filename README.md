# AI Alibis: Multi-Agent LLM Murder Mystery

**[Play online](https://ai-murder-mystery.onrender.com)**
<div align="center">
<a href="https://ai-murder-mystery.onrender.com/" target="_blank">
<img alt="Ai Alibis Logo" src="web/src/assets/screenshot.png" max-width="80%">
</div>
</a>

## Setup

1. Git clone the repo
```
git clone https://github.com/ironman5366/ai-murder-mystery-hackathon.git
cd ai-murder-mystery-hackathon
```

2. Add your API key to `api/.env` (optionally export conversations to Postgres with `DB_CONN_URL="postgresql://..."`)

Supported inference services: `anthropic`, `openai`, `groq`, `openrouter`, `ollama`, `deepseek`

```
INFERENCE_SERVICE=deepseek
API_KEY="YOUR_API_KEY_HERE"
MODEL=deepseek-v4-flash
MAX_TOKENS=1000
```

3. Install Node dependencies
```
cd web && npm install
```

4. Start the API
```
cd api && pip install -r requirements.txt && python main.py
```

Or on Windows:
```
.\restart-dev.ps1
```

5. In a separate terminal, start the frontend
```
cd web && npm start
```

6. Play the game at http://localhost:3000/

## Setup (with Docker)

1. Git clone the repo

```
git clone https://github.com/ironman5366/ai-murder-mystery-hackathon.git
cd ai-murder-mystery-hackathon
```

2. Set environment variables (see [api/.env.example](api/.env.example) for all options):

```
export INFERENCE_SERVICE=deepseek
export API_KEY="YOUR_API_KEY_HERE"
export MODEL=deepseek-v4-flash
```

3. Open a terminal in the folder containing this README, then run:

```
docker compose up
```

This starts three containers (the database, Python API, and React frontend) and creates a persistent volume for the database.

4. Play the game at http://localhost:3000/

To rebuild images after changing files (e.g. changing the model in `/api/settings.py`):

```
docker compose up --build
```

5. To shut down, hit `CTRL-C` or click the stop button in the Docker GUI. Clean up by deleting all containers and the associated database volume.

## Running Tests

**Frontend** (React / Vitest):
```
cd web && npm test
```

**Backend** (Python / pytest):
```
cd api && pytest
```

## Additional Info

You can read the full murder story by checking out [web/src/characters.json](https://github.com/ironman5366/ai-murder-mystery-hackathon/blob/main/web/src/characters.json), which contains the full context provided to each character.

To see how the prompting system works (critique and revision approach), check out [api/ai.py](https://github.com/ironman5366/ai-murder-mystery-hackathon/blob/main/api/ai.py).

Twitter thread: https://x.com/humanscotti/status/1810777932568399933

## Multi-language Support

The web interface supports i18n with English (default) and Simplified Chinese. Language is auto-detected from browser settings and can be manually switched via the dropdown in the top-right corner.

Character names and bios are translated in both languages. The AI's response language follows the user's selected interface language.

To add a new language, add a translation file to `web/src/i18n/locales/` and register it in `web/src/i18n/i18n.ts`.

## Contact

AI Alibis was created by [Paul Scotti](https://paulscotti.github.io/) and [Will Beddow](https://www.willbeddow.com/).
