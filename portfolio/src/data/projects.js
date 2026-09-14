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
      "TimeTrix is a professional full-stack web application that automates college timetable generation using AI-driven algorithms to solve complex scheduling problems by assigning classes faculty and classrooms without conflicts featuring three-role authentication architecture supporting Admin Faculty and Student dashboards where admins manage all resources including faculty profiles classroom details subject configurations and batch assignments while faculty view teaching schedules and students access class timetables with download options the AI-powered timetable generator uses constraint-based algorithms to create conflict-free schedules with multiple algorithm options including Genetic Algorithms Constraint Satisfaction Problems and Greedy Approaches automatically detecting and resolving clashes between faculty availability room capacity and subject requirements the frontend is built with React JSX using Tailwind CSS for responsive styling Framer Motion for smooth animations and 3D visual effects using Tilt and react-parallax-tilt libraries the backend leverages Node.js Express for RESTful API endpoints with database management using MySQL or MongoDB storing faculty subjects classrooms and generated timetables with JWT-based authentication ensuring secure login for all three user roles while the AI scheduling engine is implemented in Python and integrates via API the admin dashboard provides complete control over scheduling entities through organized interfaces with faculty and classroom management modules subject configuration defining required hours and faculty assignments timetable generation interface displaying dynamic variable grids interactive calendar views presenting weekly timetables in clean grid formats with color-coded subjects role-specific views export options enabling downloading timetables as PDF or images TimeTrix follows user-centric design principles with performance optimization aesthetic appeal through 3D effects and smooth animations scalable architecture supporting future enhancements and real-world applicability solving actual problems faced by educational institutions daily making TimeTrix an impressive portfolio project showcasing full-stack capabilities algorithmic thinking and attention to user experience built for real-world deployment in educational institutions requiring intelligent automated scheduling solutions",
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

export default projects;
