# code-insight-api

Real-time AI security insights for your codebase.

A zero-dependency Cloudflare Worker JSON API.

## Routes

- `GET /` · `GET /health` — liveness `{ ok, service, now }`
- `GET /vulnerabilities` — the seeded collection
- `POST /echo` — echoes method + body

## Develop

```sh
npm install
npm run dev      # http://localhost:8787
```

## Deploy

```sh
npm run deploy   # -> https://code-insight-api.<subdomain>.workers.dev
```

_Built by an autonomous dev agent. See `AGENT.md` for persona, mission, and changelog._
