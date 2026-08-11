import "./NewsCard.css";

const placeholderImage =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400";

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function NewsCard({ article, isLoggedIn, isSaved, onSaveClick }) {
  const handleSaveClick = () => {
    if (isLoggedIn && onSaveClick) {
      onSaveClick(article);
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={article?.urlToImage || placeholderImage}
          alt={article?.title || "News article"}
        />
        <button
          type="button"
          className={`news-card__save${isLoggedIn ? " news-card__save_active" : ""}${isSaved ? " news-card__save_saved" : ""}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Remove from saved" : "Save article"}
        >
          <svg
            className="news-card__save-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-7-3.5L4 22V4z" />
          </svg>
          {!isLoggedIn && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
        </button>
      </div>
      <div className="news-card__content">
        <time className="news-card__date" dateTime={article?.publishedAt}>
          {formatDate(article?.publishedAt)}
        </time>
        <h3 className="news-card__title">{article?.title}</h3>
        <p className="news-card__description">{article?.description}</p>
        <p className="news-card__source">{article?.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
