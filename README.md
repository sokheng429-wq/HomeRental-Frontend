# Home Rental App

A mobile-style React app for browsing room/apartment/condo rentals in Phnom
Penh, backed by a real **FastAPI + MySQL** backend with:

- Email/password auth (JWT)
- Real listings stored in MySQL (search + filter by type)
- A rule-based chat bot that queries actual listings in the database
  (understands budgets like "$500" and neighborhoods like "BKK1", and
  remembers the last listing it suggested so "give me the owner's number"
  resolves correctly)

## Project layout

```
home-rental-app/
  src/                # React frontend (Vite)
    api.js            # API client — talks to the FastAPI backend
    screens/, components/, data/
  backend/            # FastAPI + MySQL backend
    app/
      main.py          # FastAPI app + CORS
      models.py        # SQLAlchemy models (User, Listing, ChatMessage)
      chatbot.py        # Rule-based rental assistant, queries MySQL
      routers/          # auth.py, listings.py, chat.py
      seed.py           # optional demo data
    docker-compose.yml  # local MySQL
    requirements.txt
```

## Running it locally

You need two things running at once: the backend (port 8000) and the
frontend (port 5173).

### 1. Backend

```bash
cd backend
docker compose up -d              # starts MySQL on localhost:3306

python3 -m venv .venv
source .venv/bin/activate         # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env

python -m app.seed                # optional: adds demo user + listings
uvicorn app.main:app --reload --port 8000
```

Full details in [`backend/README.md`](backend/README.md). API docs live at
http://localhost:8000/docs once it's running.

### 2. Frontend

In a separate terminal:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). The frontend
reads the API URL from `.env` (`VITE_API_BASE`, defaults to
`http://localhost:8000`).

### 3. Try it out

- Sign up for a new account, or log in with the seeded demo account:
  `demo@homerental.app` / `password123`
- Home screen lists come straight from MySQL; use the search box or the
  category tabs to filter.
- **Add Post** creates a real row in the `listings` table (include an owner
  phone number so the chat bot can hand it out).
- **AI Chat Bot** persists your conversation per-user. Try: *"I need a room
  in BKK1 for $400"* then *"what's the owner's number?"*

## Screens

- **Loading** — splash screen
- **Login / Create Account** — real auth against the backend
- **Home** — search, category tabs, Featured/Nearby/Popular listings from MySQL
- **Wishlist** — saved listings (still local/empty — not wired to a backend table yet)
- **Profile** — menu, log out (clears the stored JWT)
- **Edit Profile** — name/phone/location form
- **AI Chat Bot** — chat UI backed by `/chat/message`, history persisted in MySQL
- **Add Post** — creates a listing via `POST /listings`

## Notes / next steps

- `src/data/listings.js` and `src/data/botReplies.js` are no longer used —
  kept only for reference, since the real data now comes from the backend.
- Auth tokens are stored in `localStorage` (`hr_token`) — fine for local
  dev; consider httpOnly cookies for production.
- The chat bot is intentionally rule-based (no external API key needed) but
  `app/chatbot.py` is written so you can swap `generate_reply` for a call to
  a real LLM later while reusing its MySQL lookup helpers.
- No Alembic migrations yet — tables are created automatically on backend
  startup, which is fine for local development.
"# HomeRental-Frontend" 
