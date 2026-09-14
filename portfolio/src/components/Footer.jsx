

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} Yash · NIT Warangal CSE '28
        </p>
        <nav className="footer__links" aria-label="Social links">
          <a
            href="https://github.com/Yash-hacker-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            LinkedIn
          </a>
          <a href="mailto:yash@nitw.ac.in" className="footer__link">
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
