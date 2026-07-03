import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">2024 Supersite, Powered by News API</p>
      <div className="footer__menu">
        <ul className="footer__links">
          <li>
            <a className="footer__link" href="#">
              Home
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://tripleten.com"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__social" aria-label="Social media links">
          <li>
            <a
              className="footer__icon-link"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg
                className="footer__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.51v-1.78c-2.93.64-3.55-1.25-3.55-1.25-.48-1.2-1.17-1.52-1.17-1.52-.96-.65.07-.64.07-.64 1.06.08 1.62 1.07 1.62 1.07.94 1.6 2.47 1.13 3.08.86.1-.67.37-1.13.67-1.39-2.34-.26-4.8-1.15-4.8-5.13 0-1.13.41-2.06 1.08-2.79-.1-.26-.47-1.33.11-2.77 0 0 .88-.28 2.89 1.07a10.22 10.22 0 0 1 5.26 0c2-1.35 2.88-1.07 2.88-1.07.58 1.44.22 2.51.11 2.77.67.73 1.08 1.66 1.08 2.79 0 3.99-2.47 4.87-4.83 5.12.38.32.72.95.72 1.92v2.85c0 .29.19.63.73.51A10.5 10.5 0 0 0 12 1.5z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="footer__icon-link"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="footer__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M13.5 8.2V6.4c0-.64.5-.9 1.08-.9H16V2.6h-2.3c-2.78 0-3.6 2.08-3.6 3.42v2.18H8v3.18h2.1V21h3.4v-9.62h2.3l.34-3.18h-2.64z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
