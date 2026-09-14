# Interactive Multi-Page Portfolio — CS1303 Assignment 2

NIT Warangal · Department of Computer Science & Engineering  
**Student:** Yash Sanghi | **GitHub:** [Yash-hacker-tech](https://github.com/Yash-hacker-tech)  
**Repo:** https://github.com/Yash-hacker-tech/sem5_portfolio_v1

---

## Repository Structure

```
portfolio-assignment2/
├── backend/          ← Express REST API (Node.js)
│   ├── data/
│   │   └── projects.js     ← single source of truth for project data
│   ├── server.js           ← Express app + all routes
│   ├── package.json
│   └── .env.example        ← copy to .env before running
└── portfolio/        ← React SPA (Create React App)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── data/
    │   └── styles/
    └── package.json
```

---

## Quick Start

### 1 — Clone

```bash
git clone https://github.com/Yash-hacker-tech/sem5_portfolio_v1.git
cd sem5_portfolio_v1
```

### 2 — Backend

```bash
cd backend
cp .env.example .env       # create your env file
npm install
npm start                  # → http://localhost:5000
```

### 3 — Frontend

```bash
cd portfolio
npm install
npm start                  # → http://localhost:3000
```

> Both servers must run simultaneously. The React app proxies API calls to `http://localhost:5000`.

---

## Backend — API Reference

Base URL: `http://localhost:5000`

All responses are `application/json`.

---

### B1 · GET /api/projects — List all projects

Returns the full array of projects.

**Request**
```bash
curl http://localhost:5000/api/projects
```

**Success Response — 200 OK**
```json
[
  {
    "id": "TimeTrix",
    "title": "TimeTrix - Time Table maker using Genetic algorithm",
    "description": "A full-stack platform where teachers and professors can add the schedule...",
    "techStack": ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    "image": null,
    "link": "https://github.com/Alokkumarshah/TimeTrix",
    "longDescription": "TimeTrix is a professional full-stack web application...",
    "challenges": "The main challenge is generating conflict-free timetables...",
    "outcome": "Successfully developed an automated, conflict-free timetable generation system..."
  },
  { "id": "algoviz", "..." },
  { "id": "cptracker", "..." }
]
```

---

### B2 · GET /api/projects/:id — Get single project

**Request**
```bash
curl http://localhost:5000/api/projects/algoviz
```

**Success Response — 200 OK**
```json
{
  "id": "algoviz",
  "title": "AlgoViz - Algorithm Visualizer",
  "description": "An interactive browser-based tool that animates sorting and graph traversal algorithms...",
  "techStack": ["JavaScript", "HTML5 Canvas", "CSS3", "Vanilla JS"],
  "image": null,
  "link": "https://github.com/Yash-hacker-tech/algoviz",
  "longDescription": "AlgoViz renders animations frame-by-frame on an HTML5 Canvas element...",
  "challenges": "Synchronising the generator-based algorithm state with requestAnimationFrame...",
  "outcome": "Used as a teaching aid in the DSA lab sessions..."
}
```

**Failure — 404 Not Found** (invalid id)
```bash
curl http://localhost:5000/api/projects/doesnotexist
```
```json
{ "error": "Project not found." }
```

---

### B3 · POST /api/contact — Submit contact form

**Request**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Hello, I loved your portfolio!"}'
```

**Success Response — 200 OK**
```json
{
  "ok": true,
  "message": "Message received. We will reply within 24 hours."
}
```

**Failure — 400 Bad Request: missing name**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"jane@example.com","message":"Hello there!"}'
```
```json
{ "error": "Name is required." }
```

**Failure — 400 Bad Request: invalid email**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"not-an-email","message":"Hello there!"}'
```
```json
{ "error": "Enter a valid email address." }
```

**Failure — 400 Bad Request: message too short**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","message":"Hi"}'
```
```json
{ "error": "Message must be at least 10 characters." }
```

---

### B4 · GET /api/projects (filter by tech) — *query param*

Filter projects by a technology in their `techStack`:

```bash
curl "http://localhost:5000/api/projects?tech=React"
```

---

### B5 · Unknown route — 404 fallback

Any unmatched route returns:

```bash
curl http://localhost:5000/api/unknown
```
```json
{ "error": "Route not found." }
```

---

### B6 · GET /api/projects/:id — valid IDs

| ID | Project |
|----|---------|
| `TimeTrix` | TimeTrix Timetable Maker |
| `algoviz` | AlgoViz Algorithm Visualizer |
| `cptracker` | CP Tracker Dashboard |

---

### B7 · POST /api/contact — full validation matrix

| Field | Rule | Error message |
|-------|------|--------------|
| `name` | Required, non-empty | `"Name is required."` |
| `email` | Required, non-empty | `"Email is required."` |
| `email` | Valid format (regex) | `"Enter a valid email address."` |
| `message` | Min 10 characters | `"Message must be at least 10 characters."` |

---

## Environment Variables

Copy `backend/.env.example` to `backend/.env` before running:

```bash
cd backend
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Port the Express server listens on |

---

## Frontend — Setup & Run

```bash
cd portfolio
npm install
npm start          # dev server → http://localhost:3000
npm run build      # production build (zero console errors)
```

### Routes

| Route | Component |
|-------|-----------|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects |
| `/projects/:projectId` | ProjectDetail (useParams) |
| `/contact` | Contact |
| `*` | NotFound (404 catch-all) |

---

## Frontend — React Architecture Notes

### useState — 3 independent pieces

| # | State | Location | Purpose |
|---|-------|----------|---------|
| 1 | `theme` | App | Dark/light toggle; lifted and shared via props |
| 2 | `fields` + `errors` + `touched` + `submitted` | ContactForm | Controlled inputs, live validation, disabled submit |
| 3 | `expanded` | ProjectCard (each instance) | Per-card view-details toggle, independently scoped |

### useEffect hooks

| # | File | Deps | Purpose |
|---|------|------|---------|
| 1 | `Home.jsx` | `[]` | Loading spinner on mount; cleanup clears timeout |
| 2 | `App.jsx` | `[theme]` | Persists theme to localStorage + sets `data-theme` |
| 3 | `Navbar.jsx` | `[]` | Auto-closes mobile menu on resize |
| 4 | `Navbar.jsx` | `[]` | Scroll shadow on sticky nav |

### Prop drilling — 2 levels

```
Projects → ProjectCard (id, title, description, techStack, link)
               → TechBadge (tech: string)
```

---

## Constraints Met

- ✅ Functional components + Hooks only
- ✅ No Redux / Zustand / Context — useState + props only
- ✅ No UI libraries — plain JSX + CSS custom properties
- ✅ `npm run build` — zero errors
- ✅ Responsive: ≤480 px mobile, ≤768 px tablet
- ✅ Semantic HTML, WCAG AA contrast, logical heading hierarchy
- ✅ Backend: Express REST API, CORS enabled for `localhost:3000`
- ✅ Backend: Input validation with descriptive error messages
- ✅ Backend: 404 fallback for unmatched routes

---

## Postman Collection

A ready-to-import Postman collection covering all endpoints (B1–B7) including failure cases is available at:

📄 [`postman_collection.json`](./postman_collection.json) — in the repo root.

**To import:** Open Postman → Import → Upload `postman_collection.json`.
