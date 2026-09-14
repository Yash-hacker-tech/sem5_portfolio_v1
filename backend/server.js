const express = require("express");
const cors    = require("cors");

const projects = require("./data/projects");

const app  = express();
const PORT = process.env.PORT || 5000;

// -- Middleware ----------------------------------------------------------------
app.use(cors({ origin: "http://localhost:3000" })); // allow CRA dev server
app.use(express.json());

// -- Routes --------------------------------------------------------------------

// GET /api/projects — return all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// GET /api/projects/:id — return a single project
app.get("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found." });
  }
  res.json(project);
});

// POST /api/contact — receive contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // -- Basic validation ------------------------------------------------------
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required." });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: "Email is required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  if (!message || message.trim().length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters." });
  }

  // -- Log the submission (replace with DB write / email send as needed) -----
  console.log("\n?? New contact message received:");
  console.log("  Name   :", name.trim());
  console.log("  Email  :", email.trim());
  console.log("  Message:", message.trim());
  console.log("");

  res.status(200).json({ ok: true, message: "Message received. We will reply within 24 hours." });
});

// -- 404 fallback for unmatched API routes -------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// -- Start server --------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`);
});
