import Navigation from "../Navigation/Navigation.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import "./Header.css";

function Header({ onSearch, onLoginClick, onRegisterClick }) {
  return (
    <header className="header">
      <Navigation
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />
      <div className="header__content">
        <h1 className="header__title">NewsExplorer</h1>
        <p className="header__caption">What's going on in the world?</p>
        <p className="header__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={onSearch} />
      </div>
    </header>
  );
}

export default Header;
