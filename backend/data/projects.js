// Shared project data — the single source of truth for the backend.
// Mirrors what was previously in frontend/src/data/projects.js.

const projects = [
  {
    id: "TimeTrix",
    title: "TimeTrix — Time Table maker using Genetic algorithm",
    description:
      "A full-stack platform where teachers and profferrs can add the schedule and give some basic info related to how their timetable should be and hit generate and It will give best timetable possible with respect of their constraints",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    image: null,
    link: "https://github.com/Alokkumarshah/TimeTrix",
    longDescription:
      "TimeTrix is a professional full-stack web application that automates college timetable generation using AI-driven algorithms to solve complex scheduling problems.",
    challenges:
      "The main challenge is generating conflict-free timetables while simultaneously satisfying faculty, classroom, batch, availability, capacity, and subject constraints efficiently.",
    outcome:
      "Successfully developed an automated, conflict-free timetable generation system with role-based dashboards, intelligent scheduling, secure authentication, and exportable timetables.",
  },
  {
    id: "algoviz",
    title: "AlgoViz — Algorithm Visualizer",
    description:
      "An interactive browser-based tool that animates sorting and graph traversal algorithms step-by-step. Supports Bubble Sort, Quick Sort, Merge Sort, BFS, and DFS with adjustable speed controls.",
    techStack: ["JavaScript", "HTML5 Canvas", "CSS3", "Vanilla JS"],
    image: null,
    link: "https://github.com/Yash-hacker-tech/algoviz",
    longDescription:
      "AlgoViz renders animations frame-by-frame on an HTML5 Canvas element. Each algorithm is implemented as a generator function, yielding intermediate states that the animation loop consumes. Speed is controlled by adjusting the interval between frames. Graph traversal modes display an adjacency-list representation alongside the canvas.",
    challenges:
      "Synchronising the generator-based algorithm state with requestAnimationFrame without causing visual artifacts required a dedicated scheduler layer.",
    outcome:
      "Used as a teaching aid in the DSA lab sessions. Received commendation from the department faculty for clarity of visualization.",
  },
  {
    id: "cptracker",
    title: "CP Tracker — Competitive Programming Dashboard",
    description:
      "A personal dashboard that aggregates problem-solving stats from Codeforces, LeetCode, and CodeChef into a single view with streak tracking, rating graphs, and topic-wise breakdown.",
    techStack: ["React", "Node.js", "Chart.js", "REST APIs", "Express"],
    image: null,
    link: "https://github.com/Yash-hacker-tech/cp-tracker",
    longDescription:
      "CP Tracker polls the public APIs of Codeforces and LeetCode on a schedule and caches responses in a lightweight SQLite database to stay within rate limits. The frontend renders rating history as line charts using Chart.js and shows a GitHub-style contribution heatmap for daily solve streaks.",
    challenges:
      "LeetCode does not expose an official public API, so the tracker uses a reverse-engineered GraphQL endpoint, which required careful error handling for schema changes.",
    outcome:
      "Personal productivity tool used daily. Helped maintain a 90-day solve streak leading up to campus placements.",
  },
];

module.exports = projects;
