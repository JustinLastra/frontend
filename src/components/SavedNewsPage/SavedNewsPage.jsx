import Navigation from "../Navigation/Navigation.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import Footer from "../Footer/Footer.jsx";
import "./SavedNewsPage.css";

function SavedNewsPage({ savedArticles }) {
  return (
    <section id="saved-news" className="saved-news-page">
      <header className="saved-news-page__header">
        <Navigation isSavedPage />
        <div className="saved-news-page__info">
          <p className="saved-news-page__label" />
          <h2 className="saved-news-page__title" />
        </div>
      </header>

      {savedArticles.length > 0 && (
        <ul className="saved-news-page__grid">
          {savedArticles.map((article) => (
            <li key={article.id} className="saved-news-page__item">
              <NewsCard article={article} />
            </li>
          ))}
        </ul>
      )}

      <Footer />
    </section>
  );
}

export default SavedNewsPage;
