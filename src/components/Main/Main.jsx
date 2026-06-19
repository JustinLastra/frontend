import NewsCard from "../NewsCard/NewsCard.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import "./Main.css";

function Main({ articles, isLoading }) {
  const hasArticles = articles.length > 0;

  return (
    <main className="main">
      <section className="main__results">
        <h2 className="main__title" />
        {isLoading && <Preloader />}
        {!isLoading && hasArticles && (
          <ul className="main__grid">
            {articles.map((article) => (
              <li className="main__item" key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !hasArticles && <p />}
      </section>
    </main>
  );
}

export default Main;
