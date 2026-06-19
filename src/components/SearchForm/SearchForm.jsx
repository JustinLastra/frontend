import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input" type="text" />
      <button type="submit" className="search-form__button" />
    </form>
  );
}

export default SearchForm;
