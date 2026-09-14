import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar  from './components/Navbar';
import Footer  from './components/Footer';

import Home          from './pages/Home';
import About         from './pages/About';
import Projects      from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact       from './pages/Contact';
import NotFound      from './pages/NotFound';

import './styles/global.css';

function App() {
  // ── State 1: dark/light theme (lifted to App, shared via props) ──────────
  // Read persisted preference from localStorage on initial render
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  // ── useEffect #2: persist theme to localStorage whenever it changes ──────
  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); // runs whenever `theme` changes

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <BrowserRouter>
      {/*
        Shared layout: Navbar + <main content> + Footer persists across routes.
        Theme is passed via props to Navbar so the toggle button lives in the nav.
      */}
      <div className="app-shell">
        <Navbar theme={theme} onToggle={toggleTheme} />

        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/projects"       element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/contact"        element={<Contact />} />
          {/* 404 catch-all */}
          <Route path="*"               element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
