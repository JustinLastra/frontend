import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    if (onSearch) {
      onSearch(trimmedQuery);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="search-form-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter topic"
          aria-label="Search topic"
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </form>
      {error && <p className="search-form__error">{error}</p>}
    </div>
  );
}

export default SearchForm;
