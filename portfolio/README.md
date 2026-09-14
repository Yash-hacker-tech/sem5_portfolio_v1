# Interactive Multi-Page Portfolio — CS1303 Assignment 2

NIT Warangal · Department of Computer Science & Engineering
**Student:** Yash | **GitHub handle:** Yash-hacker-tech

---

## Setup & Run

```bash
npm install        # restore node_modules
npm start          # dev server at http://localhost:3000
npm run build      # production build (zero console errors)
```

---

## Folder structure

```
src/
├── components/
│   ├── Navbar.jsx / .css         — sticky nav, hamburger, theme toggle
│   ├── Footer.jsx / .css
│   ├── ProjectCard.jsx / .css    — generic, 100% prop-driven
│   ├── TechBadge.jsx / .css      — grandchild (prop drill level 2)
│   ├── Skills.jsx / .css
│   └── ContactForm.jsx / .css
├── pages/
│   ├── Home.jsx / .css           — loading spinner useEffect
│   ├── About.jsx / .css
│   ├── Projects.jsx / .css
│   ├── ProjectDetail.jsx / .css  — useParams dynamic route
│   ├── Contact.jsx / .css
│   └── NotFound.jsx / .css
├── data/
│   └── projects.js               — 4 project objects, single source of truth
├── styles/
│   └── global.css                — CSS tokens, resets, utilities
├── App.jsx                       — theme state + router + shared layout
└── index.js
```

---

## Component tree & state-lifting decisions

```
App  (theme state)
├── Navbar  (theme, onToggle via props)
├── Routes
│   ├── Home              — local: ready (loading)
│   ├── About → SkrojectDetail     — useParams :projectId
│   ├── Cills
│   ├── Projects → ProjectCard[] → TechBadge[]   ← prop drilling 2 levels
│   ├── Pontact → ContactForm  — local: fields, errors, touched, submitted
│   └── NotFound
└── Footer
```

**Why theme is lifted to App:** It must affect all pages, Navbar, and Footer. Lifting to App and passing via props is the simplest solution without Context. The `data-theme` attribute is set on `<html>` so CSS tokens cascade everywhere.

**Why ContactForm state is local:** No other component reads form data, so lifting it higher would add unnecessary coupling.

**Why ProjectCard expanded state is local:** Each card expands/collapses independently. Shared state would require keying by ID for no benefit.

---

## useState — 3 independent pieces

| # | State | Location | Purpose |
|---|-------|----------|---------|
| 1 | `theme` | App | Dark/light toggle; lifted and shared via props |
| 2 | `fields` + `errors` + `touched` + `submitted` | ContactForm | Controlled inputs, live validation, disabled submit |
| 3 | `expanded` | ProjectCard (each instance) | Per-card view-details toggle, independently scoped |

---

## useEffect hooks

### #1 — Loading sequence on Home mount
File: `src/pages/Home.jsx` | Deps: `[]`

```js
useEffect(() => {
  const timer = setTimeout(() => setReady(true), 1000);
  return () => clearTimeout(timer); // cleanup: prevent state update if unmounted
}, []);
```
Why: Simulates async load. Cleanup prevents memory leak if user navigates away early.

---

### #2 — Persist theme to localStorage
File: `src/App.jsx` | Deps: `[theme]`

```js
useEffect(() => {
  localStorage.setItem('portfolio-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```
Why: localStorage is a side effect outside React's model. Runs on every theme change. Initial value read back via lazy useState initialiser.

---

### #3 — Window resize listener in Navbar
File: `src/components/Navbar.jsx` | Deps: `[]`

```js
useEffect(() => {
  const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```
Why: Auto-closes mobile menu on resize. Cleanup prevents listener accumulation.

---

### #4 — Scroll shadow in Navbar
File: `src/components/Navbar.jsx` | Deps: `[]`

```js
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
Why: Adds visual separation to sticky nav on scroll. Cleanup prevents memory leak.

---

## Routing

| Route | Component |
|-------|-----------|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects |
| `/projects/:projectId` | ProjectDetail (useParams) |
| `/contact` | Contact |
| `*` | NotFound (404 catch-all) |

All internal links use `<Link>` / `<NavLink>`. No plain `<a>` for routing.

---

## Prop drilling — 2 levels

```
Projects  →  ProjectCard (id, title, description, techStack, link)
                  →  TechBadge (tech: string)
```

---

## Constraints met

- Functional components + Hooks only
- No Redux/Zustand/Context — useState + props only
- No UI libraries — plain JSX + CSS custom properties
- npm run build: zero errors
- Folder structure: components/, pages/, data/, styles/
- Responsive: <=480px mobile, <=768px tablet
- Semantic HTML, WCAG AA contrast, logical heading hierarchy
