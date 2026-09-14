import { useState } from 'react';
import { Link } from 'react-router-dom';
import TechBadge from './TechBadge';


// ProjectCard is a generic component — all content comes through props.
// No hardcoded content inside this component.
// Props: { id, title, description, techStack, link }
//
// Prop drilling path:
//   ProjectsPage  →  ProjectCard (receives project object as props)
//                              ↓
//                     TechBadge (receives individual `tech` string as prop)

function ProjectCard({ id, title, description, techStack, link }) {
  const [expanded, setExpanded] = useState(false); // per-card independent state

  return (
    <article className={`project-card${expanded ? ' project-card--expanded' : ''}`}>
      <div className="project-card__placeholder" aria-hidden="true">
        <span>{title.charAt(0)}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>

        <p className="project-card__desc">
          {expanded ? description : `${description.slice(0, 120)}…`}
        </p>

        <div className="project-card__tags" aria-label="Tech stack">
          {/* Prop drilling: techStack array → TechBadge (grandchild) */}
          {techStack.map(tech => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        <div className="project-card__actions">
          <button
            className="btn btn-outline project-card__details-btn"
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'View details'}
          </button>

          <Link
            to={`/projects/${id}`}
            className="btn btn-primary"
            aria-label={`Full page for ${title}`}
          >
            Full page →
          </Link>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label={`GitHub repo for ${title}`}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
