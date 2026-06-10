# Repository Guidelines

This file mirrors `CLAUDE.md` — keep the two in sync when updating either.

## Project Overview

A travel destination review app: Flask REST API backend (`server/`) + React frontend (`client/`). Users sign up, browse locations/destinations, and leave one review per destination.

## Commands

Backend (run from `server/`, after `pip install -r requirements.txt`):

- `python app.py` — start the Flask API at http://localhost:5555 (set `FLASK_DEBUG=1` for the debugger/auto-reload; off by default)
- `flask db migrate -m "message"` — generate a migration after model changes
- `flask db upgrade` — apply migrations
- `python seed.py` — repopulate local seed data

Frontend (run from `client/`):

- `npm install` — install dependencies
- `npm start` — dev server at http://localhost:3000 (proxies API calls to :5555 via `proxy` in package.json)
- `npm test` — React test runner in watch mode; `npm test -- --watchAll=false` for a single run
- `npm run build` — production build

No backend tests exist. If adding them, use pytest under `server/tests/` with a temporary database, not `server/instance/destinations.db`.

## Architecture

### Backend (`server/`)

- `config.py` creates and wires everything: `app`, `db` (re-exported from `models/dbconfig.py`), `api` (Flask-RESTful), `bcrypt`, CORS, and Flask-Migrate. The SQLite database lives at `server/instance/destinations.db`.
- `app.py` contains ALL route logic as Flask-RESTful `Resource` classes, registered with `api.add_resource()` at the bottom. There are no blueprints.
- Import structure is circular by design: `config.py` imports `db` from `models/dbconfig.py`, while `models/user.py` imports `bcrypt` from `config`. Consequently, all backend commands must be run from inside `server/` so these top-level imports resolve.

### Data model

- `Location` 1→many `Destination` (backref `location`)
- `Destination` many↔many `Review` through the `ReviewDestination` join model (`review.destinations` / `destination.reviews` hold `ReviewDestination` rows, so reaching the actual review requires `rd.review`)
- `User` 1→many `Review` (backref `user`)
- Validations live on the models: `Review.rating` must be 1–5; `User.email` must contain `@`. Passwords are bcrypt-hashed via the `password_hash` hybrid property (write-only; reading it raises).

### Auth

Session-cookie based: login/signup store `user_id` in the Flask `session`; `GET /checksession` verifies it. Mutating review endpoints derive the user from the session and enforce ownership (401 when not logged in, 403 for another user's review); `PATCH /reviews/<id>` only accepts `rating` and `comment`. The frontend additionally tracks login state in browser localStorage for UI purposes — never trust client-supplied user IDs server-side. Fetches must stay same-origin (relative URLs through the CRA proxy) or the session cookie won't flow.

### Frontend (`client/`)

Create React App with all views and components flat in `client/src/components/`; routing via react-router-dom v6 in `App.js`. Forms use Formik + Yup. Styling mixes Tailwind, Bootstrap/react-bootstrap, and `client/src/index.css` — don't add another UI framework.

## Conventions

- Python: PEP 8, 4-space indent, `PascalCase` for model/resource classes.
- React: functional components, `PascalCase` filenames (e.g. `AddReview.js`).
- Commits are short and imperative, e.g. `Update Location.js`.
- Don't commit secrets, session files, local databases, or `__pycache__`/cache output. Set `SECRET_KEY` in the environment for any deployment (`config.py` falls back to a dev-only value); the DB URL is still hardcoded in `config.py`.
