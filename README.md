# MAVIS 2.0 Prototype Screens

Static HTML/CSS/JS prototype screens for the MAVIS 2.0 inspection platform.

## Local preview

```bash
npm install
npm start
```

Then open http://localhost:3000 — the root redirects to `01-dashboard.html`.

## Deploy on Railway

Railway auto-detects either the `Dockerfile` or `package.json` and runs `npm start`, which serves the directory on `$PORT` using [`serve`](https://github.com/vercel/serve).
