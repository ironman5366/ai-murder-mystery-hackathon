# AI Alibis Frontend

React frontend for the AI Alibis multi-agent LLM murder mystery game.

## Available Scripts

```
npm start        # Run in development mode (http://localhost:3000)
npm test         # Launch Vitest test runner
npm run build    # Build for production to build/
```

## Environment

No frontend-specific environment variables needed. All configuration is managed through the backend API.

## i18n

Translation files are in `src/i18n/locales/`. To add a new language:

1. Create `src/i18n/locales/<lang>.json`
2. Register it in `src/i18n/i18n.ts`
3. Add character name and bio keys matching `characterXxx` / `bioXxx` convention
