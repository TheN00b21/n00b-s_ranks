# Local Server + RWFC Proxy

This repository contains a small Express server that serves the static site and provides a proxy endpoint to fetch Retro Rewind player data (avoids CORS and allows caching).

Quick start:

1. Install dependencies

```bash
npm install
```

2. Run the server

```bash
npm start
```

3. Open the site

Visit http://localhost:3000 in your browser. The Retro Rewind card will use the proxy endpoint `/api/rwfc/player/:friendCode` to fetch VR and rank data.

Notes:
- The proxy caches responses for 30 seconds to reduce upstream calls.
- If you deploy the site elsewhere, ensure the proxy is available at the same origin or update `index.html` to point to the proxy host.
