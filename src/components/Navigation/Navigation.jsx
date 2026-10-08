import { useState } from "react";
import { NavLink } from "react-router-dom";
import menuWhite from "../../assets/icons/menu-white.svg";
import menuDark from "../../assets/icons/menu-dark.svg";
import closeWhite from "../../assets/icons/close-white.svg";
import logoutWhite from "../../assets/icons/logout-white.svg";
import logoutDark from "../../assets/icons/logout-dark.svg";
import "./Navigation.css";

function Navigation({
  isSavedPage = false,
  isLoggedIn = false,
  userName = "",
  onLoginClick,
  onLogoutClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLoginClick = () => {
    closeMenu();
    onLoginClick?.();
  };

  const handleLogoutClick = () => {
    closeMenu();
    onLogoutClick?.();
  };

  const useDarkIcons = isSavedPage && !isMenuOpen;

  return (
    <nav
      className={`navigation${isSavedPage ? " navigation_dark" : ""}${isMenuOpen ? " navigation_open" : ""}`}
    >
      <NavLink className="navigation__logo" to="/" onClick={closeMenu}>
        NewsExplorer
      </NavLink>
      <button
        type="button"
        className="navigation__toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <img
          className="navigation__toggle-icon"
          src={isMenuOpen ? closeWhite : useDarkIcons ? menuDark : menuWhite}
          alt=""
        />
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
      </ul>
      <div className="navigation__auth">
        {isLoggedIn ? (
          <button
            type="button"
            className="navigation__button navigation__button_signout"
            onClick={handleLogoutClick}
            aria-label={`Sign out ${userName}`}
          >
            <span className="navigation__user">{userName}</span>
            <img
              className="navigation__icon"
              src={useDarkIcons ? logoutDark : logoutWhite}
              alt=""
            />
          </button>
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
