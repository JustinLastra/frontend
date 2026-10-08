import Navigation from "../Navigation/Navigation.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";
import "./SavedNewsPage.css";

function formatKeywords(articles) {
  const counts = new Map();

  articles.forEach(({ keyword }) => {
    if (keyword) {
      counts.set(keyword, (counts.get(keyword) || 0) + 1);
    }
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);
}

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

  const keywords = formatKeywords(savedArticles);
  const shownKeywords = keywords.length > 3 ? keywords.slice(0, 2) : keywords;
  const otherCount = keywords.length - shownKeywords.length;

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
          {keywords.length > 0 && (
            <p className="saved-news-page__keywords">
              By keywords:{" "}
              <strong className="saved-news-page__keywords-list">
                {shownKeywords.map((keyword, index) => {
                  const isLast = index === shownKeywords.length - 1;
                  const hasOthers = otherCount > 0;
                  let separator = "";

                  if (!isLast) {
                    separator =
                      shownKeywords.length === 2 && !hasOthers ? " and " : ", ";
                  } else if (hasOthers) {
                    separator = `, and ${otherCount} other`;
                  }

                  return `${keyword}${separator}`;
                })}
              </strong>
            </p>
          )}
        </div>
      </header>

      {count > 0 ? (
        <ul className="saved-news-page__grid">
          {savedArticles.map((article) => (
            <li
              key={article.url || article._id}
              className="saved-news-page__item"
            >
              <NewsCard
                article={article}
                isLoggedIn={isLoggedIn}
                isSaved
                isSavedPage
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
