import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isSavedPage = false,
  isLoggedIn = false,
  userName = "",
  onLoginClick,
  onLogoutClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    closeMenu();
    onLoginClick?.();
  };

  const handleLogoutClick = () => {
    closeMenu();
    onLogoutClick?.();
  };

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  return (
    <nav
      className={`navigation${isSavedPage ? " navigation_dark" : ""}${isMenuOpen ? " navigation_menu-open" : ""}`}
    >
      <NavLink className="navigation__logo" to="/" onClick={closeMenu}>
        NewsExplorer
      </NavLink>

      <button
        type="button"
        className={`navigation__burger${isMenuOpen ? " navigation__burger_open" : ""}`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <span className="navigation__burger-line" />
        <span className="navigation__burger-line" />
        <span className="navigation__burger-line" />
      </button>

      <div className="navigation__menu">
        <ul className="navigation__links">
          <li>
            <NavLink
              className={({ isActive }) =>
                `navigation__link${isActive && !isSavedPage ? " navigation__link_active" : ""}`
              }
              to="/"
              end
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  `navigation__link${isActive || isSavedPage ? " navigation__link_active" : ""}`
                }
                to="/saved-news"
                onClick={closeMenu}
              >
                Saved Articles
              </NavLink>
            </li>
          )}
        </ul>
        <div className="navigation__auth">
          {isLoggedIn ? (
            <>
              <span className="navigation__user">{userName}</span>
              <button
                type="button"
                className="navigation__button"
                onClick={handleLogoutClick}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="navigation__button"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
