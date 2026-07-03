import "./Navigation.css";

function Navigation({ isSavedPage = false, onLoginClick, onRegisterClick }) {
  const homeLinkClass = `navigation__link${!isSavedPage ? " navigation__link_active" : ""}`;
  const savedLinkClass = `navigation__link${isSavedPage ? " navigation__link_active" : ""}`;

  return (
    <nav className="navigation">
      <a className="navigation__logo" href="#">
        NewsExplorer
      </a>
      <ul className="navigation__links">
        <li>
          <a className={homeLinkClass} href="#">
            Home
          </a>
        </li>
        <li>
          <a className={savedLinkClass} href="#">
            Saved Articles
          </a>
        </li>
      </ul>
      {!isSavedPage && (
        <div className="navigation__auth">
          <button
            type="button"
            className="navigation__button"
            onClick={onLoginClick}
          >
            {" "}
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
