// Grandchild component — receives a single tech string from ProjectCard
// This satisfies the 2-level prop drilling requirement:
//   ProjectsPage → ProjectCard (props) → TechBadge (props)


function TechBadge({ tech }) {
  return <span className="tech-badge">{tech}</span>;
}

export default TechBadge;
