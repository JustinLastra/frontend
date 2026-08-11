import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isSavedPage = false,
  isLoggedIn = false,
  userName = "",
  onLoginClick,
  onLogoutClick,
}) {
  return (
    <nav className={`navigation${isSavedPage ? " navigation_dark" : ""}`}>
      <NavLink className="navigation__logo" to="/">
        NewsExplorer
      </NavLink>
      <ul className="navigation__links">
        <li>
          <NavLink
            className={({ isActive }) =>
              `navigation__link${isActive && !isSavedPage ? " navigation__link_active" : ""}`
            }
            to="/"
            end
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
          >
            Saved Articles
          </NavLink>
        </li>
      </ul>
      <div className="navigation__auth">
        {isLoggedIn ? (
          <>
            <span className="navigation__user">{userName}</span>
            <button
              type="button"
              className="navigation__button"
              onClick={onLogoutClick}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            type="button"
            className="navigation__button"
            onClick={onLoginClick}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
