import "./Navigation.css";

function Navigation({ isSavedPage = false, onLoginClick, onRegisterClick }) {
  return (
    <nav className="navigation">
      <a className="navigation__logo" href="#" />
      <ul className="navigation__links">
        <li>
          <a className="navigation__link" href="#" />
        </li>
        <li>
          <a className="navigation__link" href="#saved-news" />
        </li>
      </ul>
      {!isSavedPage && (
        <div className="navigation__auth">
          <button
            type="button"
            className="navigation__button"
            onClick={onLoginClick}
          />
          <button
            type="button"
            className="navigation__button navigation__button_primary"
            onClick={onRegisterClick}
          />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
