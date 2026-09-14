import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TechBadge from '../components/TechBadge';
import { fetchProjectById } from '../api';


function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // ── useEffect: fetch a single project from the backend on mount ───────────
  useEffect(() => {
    let cancelled = false;

    fetchProjectById(projectId)
      .then(data => {
        if (!cancelled) {
          setProject(data);   // null means 404 / not found
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Unable to load project. Please try again later.');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [projectId]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="project-detail page-enter">
        <div className="container">
          <p className="projects-status" aria-live="polite">Loading project…</p>
        </div>
      </main>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <main className="project-detail page-enter">
        <div className="container">
          <p className="projects-status projects-status--error" role="alert">{error}</p>
          <Link to="/projects" className="btn btn-outline" style={{ marginTop: '1rem' }}>← All projects</Link>
        </div>
      </main>
    );
  }

  // ── Not found state ────────────────────────────────────────────────────────
  if (!project) {
    return (
      <main className="project-detail page-enter">
        <div className="container">
          <p className="projects-status" role="alert">Project not found.</p>
          <Link to="/projects" className="btn btn-outline" style={{ marginTop: '1rem' }}>← All projects</Link>
        </div>
      </main>
    );
  }

  const { title, description, techStack, link, longDescription, challenges, outcome } = project;

  return (
    <main className="project-detail page-enter">
      <div className="container">
        <nav className="project-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/projects">← All projects</Link>
          <span aria-hidden="true"> / </span>
          <span>{title}</span>
        </nav>

        <article className="project-detail__card">
          <header className="project-detail__header">
            <div className="project-detail__avatar" aria-hidden="true">{title.charAt(0)}</div>
            <div>
              <h1 className="project-detail__title">{title}</h1>
              <div className="project-detail__tags">
                {techStack.map(tech => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          </header>

          <section className="project-detail__section" aria-labelledby="overview-heading">
            <h2 id="overview-heading">Overview</h2>
            <p>{description}</p>
          </section>

          {longDescription && (
            <section className="project-detail__section" aria-labelledby="detail-heading">
              <h2 id="detail-heading">In depth</h2>
              <p>{longDescription}</p>
            </section>
          )}

          {challenges && (
            <section className="project-detail__section" aria-labelledby="challenge-heading">
              <h2 id="challenge-heading">Key challenge</h2>
              <p>{challenges}</p>
            </section>
          )}

          {outcome && (
            <section className="project-detail__section" aria-labelledby="outcome-heading">
              <h2 id="outcome-heading">Outcome</h2>
              <p>{outcome}</p>
            </section>
          )}

          <footer className="project-detail__footer">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on GitHub ↗
              </a>
            )}
            <Link to="/projects" className="btn btn-outline">
              ← Back to projects
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}

export default ProjectDetail;
