// Central API utility — all fetch calls go through here.
// The base URL is read from the .env file (REACT_APP_API_URL).
// This means you only need to change one place to point at a different backend.

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Fetch all projects from the backend.
 * GET /api/projects
 */
export async function fetchProjects() {
  const res = await fetch(`${BASE_URL}/api/projects`);
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);
  return res.json();
}

/**
 * Fetch a single project by ID from the backend.
 * GET /api/projects/:id
 */
export async function fetchProjectById(id) {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`);
  if (res.status === 404) return null;          // project not found
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);
  return res.json();
}

/**
 * Submit the contact form to the backend.
 * POST /api/contact
 * Body: { name, email, message }
 * Returns: { ok: true } on success, or throws with a server-provided message.
 */
export async function submitContact({ name, email, message }) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Prefer the backend's error message if present
    throw new Error(data?.error || data?.message || 'Something went wrong. Please try again.');
  }

  return data;
}
