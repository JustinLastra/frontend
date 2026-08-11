import Navigation from "../Navigation/Navigation.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";
import "./SavedNewsPage.css";

function SavedNewsPage({
  savedArticles = [],
  userName = "",
  isLoggedIn,
  onSaveClick,
  onLoginClick,
  onLogoutClick,
}) {
  const count = savedArticles.length;
  const title =
    count === 0
      ? `${userName}, you have no saved articles`
      : `${userName}, you have ${count} saved ${count === 1 ? "article" : "articles"}`;

  return (
    <section id="saved-news" className="saved-news-page">
      <header className="saved-news-page__header">
        <Navigation
          isSavedPage
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />
        <div className="saved-news-page__info">
          <p className="saved-news-page__label">Saved articles</p>
          <h2 className="saved-news-page__title">{title}</h2>
        </div>
      </header>

      {count > 0 ? (
        <ul className="saved-news-page__grid">
          {savedArticles.map((article) => (
            <li key={article.url || article._id} className="saved-news-page__item">
              <NewsCard
                article={article}
                isLoggedIn={isLoggedIn}
                isSaved
                onSaveClick={onSaveClick}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="saved-news-page__empty">
          You haven&apos;t saved any articles yet.
        </p>
      )}

      <Footer />
    </section>
  );
}

export default SavedNewsPage;
