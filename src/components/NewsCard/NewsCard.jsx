import "./NewsCard.css";

function NewsCard({ article }) {
  return (
    <article className="news-card">
      <div className="news-card__content">
        <time className="news-card__date" />
        <h3 className="news-card__title">{article?.title}</h3>
        <p className="news-card__description" />
        <p className="news-card__source" />
      </div>
    </article>
  );
}

export default NewsCard;
