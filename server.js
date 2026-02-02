const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Simple in-memory cache
const cache = new Map();
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

app.use(express.static(path.join(__dirname)));

app.get('/api/rwfc/player/:fc', async (req, res) => {
  try {
    const fc = req.params.fc;
    const key = `player:${fc}`;
    const now = Date.now();

    if (cache.has(key)) {
      const { ts, data } = cache.get(key);
      if (now - ts < CACHE_TTL_MS) {
        return res.json(data);
      }
    }

    const apiUrl = `https://rwfc.net/api/leaderboard/player/${fc}`;
    const r = await fetch(apiUrl, { timeout: 10000 });
    if (!r.ok) return res.status(502).json({ error: 'upstream_error', status: r.status });
    const json = await r.json();

    cache.set(key, { ts: now, data: json });
    res.json(json);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'proxy_error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
