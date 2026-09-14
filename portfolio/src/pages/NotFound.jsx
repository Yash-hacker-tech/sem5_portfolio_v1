import { Link } from 'react-router-dom';


function NotFound() {
  return (
    <main className="notfound page-enter">
      <div className="container notfound__inner">
        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 className="notfound__title">Page not found</h1>
        <p className="notfound__message">
          This route doesn't exist. It may have been moved, deleted, or you might have mistyped the URL.
        </p>
        <Link to="/" className="btn btn-primary">← Back to Home</Link>
      </div>
    </main>
  );
}

export default NotFound;
