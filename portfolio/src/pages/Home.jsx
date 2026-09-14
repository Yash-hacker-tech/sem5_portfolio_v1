import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function LoadingScreen() {
  const [phase, setPhase] = useState(0); // 0=logo, 1=name, 2=tagline, 3=progress, 4=exit
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase(1), 300);   // show name
    const t2 = setTimeout(() => setPhase(2), 900);   // show tagline
    const t3 = setTimeout(() => setPhase(3), 1400);  // start progress bar

    // Animate progress bar from 0→100 over ~1s
    let prog = 0;
    let rafId;
    const t4 = setTimeout(() => {
      const tick = () => {
        prog += 2.5;
        setProgress(Math.min(prog, 100));
        if (prog < 100) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, 1400);

    // Begin exit fade
    const t5 = setTimeout(() => setExiting(true), 2400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`loading-screen${exiting ? ' loading-screen--exit' : ''}`} role="status" aria-label="Loading portfolio">
      {/* Ambient orbs */}
      <div className="loading-orb loading-orb--1" aria-hidden="true" />
      <div className="loading-orb loading-orb--2" aria-hidden="true" />
      <div className="loading-orb loading-orb--3" aria-hidden="true" />

      <div className="loading-content">
        {/* Logo mark */}
        <div className="loading-logo" aria-hidden="true">
          <span>Y</span>
          <div className="loading-logo__ring" />
          <div className="loading-logo__ring loading-logo__ring--2" />
        </div>

        {/* Name reveal */}
        <h1 className={`loading-name${phase >= 1 ? ' loading-name--visible' : ''}`}>
          Yash Sanghi
        </h1>

        {/* Tagline */}
        <p className={`loading-tagline${phase >= 2 ? ' loading-tagline--visible' : ''}`}>
          Competitive Programmer · Full Stack Developer
        </p>

        {/* Progress bar */}
        <div className={`loading-bar-wrap${phase >= 3 ? ' loading-bar-wrap--visible' : ''}`}>
          <div className="loading-bar">
            <div className="loading-bar__fill" style={{ width: `${progress}%` }} />
            <div className="loading-bar__glow" style={{ left: `${progress}%` }} />
          </div>
          <span className="loading-percent">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

function Home() {
  // useEffect #1: loading sequence on component mount (empty dependency array [])
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2800);
    // Cleanup: clear timeout if component unmounts before it fires
    return () => clearTimeout(timer);
  }, []); // runs once on mount

  if (!ready) return <LoadingScreen />;

  return (
    <main className="home page-enter">
      {/* Hero */}
      <section className="hero section" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="hero__eyebrow">Hi, I'm</p>
            <h1 className="hero__name" id="hero-heading">Yash</h1>
            <p className="hero__tagline">
              Competitive Programmer · DSA specialist · Full Stack Developer
            </p>
            <p className="hero__bio">
              B.Tech CSE student at NIT Warangal ('28), building things at the intersection of
              clean code and useful products. I like designing systems that are fast, maintainable,
              and actually solve the problem.
            </p>
            <div className="hero__actions">
              <Link to="/projects" className="btn btn-primary">View projects</Link>
              <Link to="/contact" className="btn btn-outline">Get in touch</Link>
            </div>
          </div>

          <div className="hero__card" aria-hidden="true">
            <div className="hero__avatar">Y</div>
            <div className="hero__meta">
              <span className="hero__meta-item">📍 NIT Warangal</span>
              <span className="hero__meta-item">🎓 CSE '28</span>
              <span className="hero__meta-item">💻 Open to internships</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="stats-strip" aria-label="Quick statistics">
        <div className="container stats-strip__grid">
          {[
            { value: '4+', label: 'Projects built' },
            { value: '400+', label: 'Problems solved' },
            { value: '3', label: 'Hackathons' },
            { value: '1372', label: 'Codeforces rating' },
          ].map(({ value, label }) => (
            <div key={label} className="stat">
              <span className="stat__value">{value}</span>
              <span className="stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="home-cta section" aria-label="Call to action">
        <div className="container home-cta__inner">
          <h2>Want to collaborate or hire?</h2>
          <p>I'm actively looking for summer internship opportunities in Software Development roles.</p>
          <Link to="/contact" className="btn btn-primary">Let's talk →</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
