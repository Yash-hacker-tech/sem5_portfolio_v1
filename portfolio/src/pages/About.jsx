import Skills from '../components/Skills';


const TIMELINE = [
  { year: '2024', label: 'Joined NIT Warangal', desc: 'Started B.Tech in CSE. First sem: topped the batch in Programming in C++' },
  { year: '2024', label: 'Noobathon 2024 Winner', desc: 'Won 1st place at the NIT Warangal internal hackathon.' },
  { year: '2025', label: 'Crossed 400 problems', desc: 'Solved 400+ problems across Codeforces and LeetCode. Reached 1372 on CF.' },
  { year: '2025', label: 'TIMETRIX', desc: 'Built this React based Timetable Generator as part of the Smart India Hackthon.' },
];

function TimelineItem({ year, label, desc }) {
  return (
    <li className="timeline-item">
      <span className="timeline-item__year">{year}</span>
      <div className="timeline-item__content">
        <h3 className="timeline-item__label">{label}</h3>
        <p className="timeline-item__desc">{desc}</p>
      </div>
    </li>
  );
}

function About() {
  return (
    <main className="about page-enter">
      <section className="section about-hero" aria-labelledby="about-heading">
        <div className="container">
          <h1 className="section-title" id="about-heading">About me</h1>
          <p className="section-subtitle">A bit more about who I am and what I do</p>

          <div className="about-grid">
            <div className="about-bio">
              <p>
                I'm a Third-year Computer Science student at NIT Warangal, with a genuine interest
                in building things — from algorithmic problem solving to production web apps.
              </p>
              <p>
                My current focus is on full-stack development (React + Node) and Data structures
                & Algorithms. I believe the best engineers can reason from first
                principles and communicate clearly — not just write code.
              </p>
              <p>
                Outside academics, I do competitive programming to sharpen problem-solving instincts,
                and occasionally write technical notes for my peers on concepts I found hard to
                understand at first.
              </p>

              <div className="about-info-list">
                {[
                  ['Institute', 'NIT Warangal'],
                  ['Programme', 'B.Tech Computer Science & Engineering'],
                  ['Expected graduation', '2028'],
                  ['GitHub', '@Yash-hacker-tech'],
                  ['Availability', 'Open to internships (Summer 2027)'],
                ].map(([key, val]) => (
                  <div key={key} className="about-info-row">
                    <span className="about-info-key">{key}</span>
                    <span className="about-info-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="about-timeline">
              <h2 className="about-timeline__heading">Timeline</h2>
              <ul className="timeline">
                {TIMELINE.map(item => (
                  <TimelineItem key={item.label} {...item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Skills />
    </main>
  );
}

export default About;
