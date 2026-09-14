import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { fetchProjects } from '../api';


// Data flow: Projects page fetches from GET /api/projects via the api.js utility.
// Results are stored in state and passed as individual props to ProjectCard.
// ProjectCard passes each tech string as a prop to TechBadge.

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  // ── useEffect: fetch projects from the backend on mount ──────────────────
  useEffect(() => {
    let cancelled = false;

    fetchProjects()
      .then(data => {
        if (!cancelled) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Unable to load projects. Please try again later.');
          setLoading(false);
        }
      });

    return () => { cancelled = true; }; // cleanup if component unmounts
  }, []);

  return (
    <main className="projects-page page-enter">
      <section className="section" aria-labelledby="projects-heading">
        <div className="container">
          <h1 className="section-title" id="projects-heading">Projects</h1>
          <p className="section-subtitle">
            Things I've built — from hackathon nights to semester projects.
          </p>

          {/* Loading state */}
          {loading && (
            <p className="projects-status" aria-live="polite">Loading projects…</p>
          )}

          {/* Error state */}
          {!loading && error && (
            <p className="projects-status projects-status--error" role="alert">{error}</p>
          )}

          {/* Project grid — rendered only when data is ready */}
          {!loading && !error && (
            <div className="projects-grid">
              {projects.map(project => (
                // Passing each field from the project object as individual props to ProjectCard.
                // No hardcoded content inside ProjectCard — all data flows through props.
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  link={project.link}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Projects;
