# Portfolio (Server-enabled)

This project hosts a static portfolio site with a small Node.js/Express API for project data and contact messages.

Quick start (local):

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
npm start
```

The site will be available at `http://localhost:3000/`.

Deployment:
- Docker: build with `docker build -t portfolio .` and run with `docker run -p 3000:3000 portfolio`.
- Heroku / similar: `Procfile` is included (`web: node server.js`).

API endpoints:
- `GET /api/projects` — list projects
- `GET /api/projects/:key` — project detail
- `POST /api/contact` — accepts JSON `{ name, email, message }` and appends to `contacts.json`
