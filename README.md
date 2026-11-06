# YAKSHA — The Sri Lankan Heritage Archive

A bilingual (Sinhala / English) starter website about Sri Lankan history, archaeology, heritage places, ancient irrigation and Ravana-related epic traditions. The archive distinguishes archaeological evidence, historical records and folklore.

## Important: how the AI connection works

The website does **not** connect to `chatgpt.com`. That address is the public ChatGPT website, not an API endpoint for embedding ChatGPT in another website. The browser sends the question to this project's own `/api/chat` route; the Node.js server securely sends it to `https://api.openai.com/v1/responses`. The API key stays in `.env` on the server and is never placed in browser JavaScript.

If the status says **"Cannot reach the server"** or the browser reports `Failed to fetch https://chatgpt.com/`, the site is likely being opened in a ChatGPT file preview or by double-clicking `index.html`. That preview cannot run this Node server. Extract the ZIP and run the server locally as described below.

## Easiest Windows setup

1. Install Node.js 18 or newer: https://nodejs.org/
2. Extract this ZIP into a normal folder on your computer.
3. Double-click `start-yaksha.bat`.
4. On first run, it creates `.env` and opens it in Notepad. Add your OpenAI API key after `OPENAI_API_KEY=` and save the file.
5. Double-click `start-yaksha.bat` again. It installs dependencies (first run only), starts the server and opens the website.
6. Keep the terminal window open while using the website.
7. Visit `http://localhost:3000/api/health` to confirm the server is running. It reports whether an API key is configured.

You can also use PowerShell: run `start-yaksha.ps1` from the extracted folder.

## Manual setup

```bash
npm install
```

Copy `.env.example` to `.env`, then set:

```env
OPENAI_API_KEY=your_real_api_key_here
OPENAI_MODEL=gpt-4.1-mini
PORT=3000
```

Start the server:

```bash
npm start
```

Open `http://localhost:3000`.

## OpenAI billing and key safety

A ChatGPT Free/Plus subscription is separate from OpenAI API usage. You need an API key and an API billing/credit setup enabled for the API project. Create/manage keys in the OpenAI developer platform. Never paste your API key into this chat, into `index.html`, or into a public GitHub repository. If a key was exposed, revoke it and create a new one.

## Photos and videos

Each history-topic card opens a gallery that requests up to five topic-related images from Wikimedia Commons, including a dedicated Mihintale category search. The server caches gallery results for six hours. Photo availability depends on Wikimedia Commons search results and internet access. Each displayed photo links to its original file page; check the file's licence and attribution requirements before reuse. YouTube buttons open topic-related video search results; they are search links, not pre-verified or locally hosted video files.

The website uses online Wikimedia Commons and Google Fonts resources, so an internet connection is required for remote photos, fonts, the gallery and OpenAI responses. The ZIP itself is lightweight and under 5 MB; gallery photos are loaded on demand and are not all bundled into the ZIP.

## Troubleshooting

- **"Cannot reach the server"**: Do not open `index.html` directly or in ChatGPT preview. Run `start-yaksha.bat` and open `http://localhost:3000`.
- **"API key is not configured"**: Add the key to `.env`, save it and restart the server.
- **401**: The API key is invalid or revoked.
- **429**: Check API billing, available credits and rate limits.
- **Model unavailable**: Check `OPENAI_MODEL` in `.env` and the models enabled for your API project.
- **Gallery unavailable**: Check internet access and try again; Commons results are fetched live and cached.

## Project files

- `index.html` — bilingual website and browser interface
- `server.js` — local web server, Wikimedia photo gallery and secure OpenAI API proxy
- `knowledge.txt` — historical research guidance for the AI assistant
- `.env.example` — safe environment-variable template (contains no real key)
- `start-yaksha.bat` / `start-yaksha.ps1` — Windows launchers

This is a starter archive, not a complete academic encyclopedia. Historical claims should be checked against reliable primary and scholarly sources.
