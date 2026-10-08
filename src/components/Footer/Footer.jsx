import { Link } from "react-router-dom";
import githubIcon from "../../assets/icons/github.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">2024 Supersite, Powered by News API</p>
      <div className="footer__menu">
        <ul className="footer__links">
          <li>
            <Link className="footer__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://tripleten.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__social" aria-label="Social media links">
          <li>
            <a
              className="footer__icon-link"
              href="https://github.com/JustinLastra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img className="footer__icon" src={githubIcon} alt="" />
            </a>
          </li>
          <li>
            <a
              className="footer__icon-link"
              href="https://www.linkedin.com/in/justinlastra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img className="footer__icon" src={linkedinIcon} alt="" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
