

const SKILLS = {
  'Languages': ['C', 'C++', 'Python', 'JavaScript', 'SQL', 'Bash'],
  'Frontend': ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
  'Databases': ['MongoDB', 'PostgreSQL', 'SQLite', 'Oracle'],
  'Tools': ['Git', 'Linux', 'VS Code'],
  'CS Concepts': ['DSA', 'OOP', 'OS', 'DBMS', 'Computer Networks', 'CN'],
};

function SkillGroup({ category, items }) {
  return (
    <div className="skill-group">
      <h3 className="skill-group__title">{category}</h3>
      <ul className="skill-group__list" aria-label={`${category} skills`}>
        {items.map(skill => (
          <li key={skill} className="skill-group__item">{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function Skills() {
  return (
    <section className="skills-section section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <h2 className="section-title" id="skills-heading">Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([category, items]) => (
            <SkillGroup key={category} category={category} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
