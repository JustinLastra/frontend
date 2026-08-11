import NewsCard from "../NewsCard/NewsCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import "./Main.css";

function Main({
  articles,
  isLoading,
  error,
  hasSearched,
  onShowMore,
  hasMore,
  isLoggedIn,
  savedArticles,
  onSaveClick,
}) {
  if (!hasSearched) {
    return null;
  }

  const hasArticles = articles.length > 0;

  return (
    <main className="main">
      <section className="main__results">
        {isLoading && <Preloader />}
        {!isLoading && error && <p className="main__message main__message_error">{error}</p>}
        {!isLoading && !error && !hasArticles && (
          <p className="main__message">Nothing found</p>
        )}
        {!isLoading && !error && hasArticles && (
          <>
            <h2 className="main__title">Search results</h2>
            <ul className="main__grid">
              {articles.map((article) => (
                <li className="main__item" key={article.url}>
                  <NewsCard
                    article={article}
                    isLoggedIn={isLoggedIn}
                    isSaved={savedArticles.some((item) => item.url === article.url)}
                    onSaveClick={onSaveClick}
                  />
                </li>
              ))}
            </ul>
            {hasMore && (
              <button
                type="button"
                className="main__show-more"
                onClick={onShowMore}
              >
                Show more
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Main;
