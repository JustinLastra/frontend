import "./NewsCard.css";
import trashIcon from "../../assets/icons/trash.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import bookmarkSavedIcon from "../../assets/icons/bookmark-saved.svg";
import { getSourceName } from "../../utils/articles.js";

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

function NewsCard({ article, isLoggedIn, isSaved, isSavedPage, onSaveClick }) {
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
        {isSavedPage && article?.keyword && (
          <span className="news-card__keyword">{article.keyword}</span>
        )}
        {isSavedPage ? (
          <button
            type="button"
            className="news-card__save news-card__save_active news-card__delete"
            onClick={handleSaveClick}
            aria-label="Remove from saved"
          >
            <img className="news-card__delete-icon" src={trashIcon} alt="" />
          </button>
        ) : (
          <button
            type="button"
            className={`news-card__save${isLoggedIn ? " news-card__save_active" : ""}${isSaved ? " news-card__save_saved" : ""}`}
            onClick={handleSaveClick}
            aria-label={isSaved ? "Remove from saved" : "Save article"}
          >
            <img
              className="news-card__save-icon"
              src={isSaved ? bookmarkSavedIcon : bookmarkIcon}
              alt=""
            />
            {!isLoggedIn && (
              <span className="news-card__tooltip">
                Sign in to save articles
              </span>
            )}
          </button>
        )}
      </div>
      <div className="news-card__content">
        <time className="news-card__date" dateTime={article?.publishedAt}>
          {formatDate(article?.publishedAt)}
        </time>
        <h3 className="news-card__title">{article?.title}</h3>
        <p className="news-card__description">{article?.description}</p>
        <p className="news-card__source">{getSourceName(article)}</p>
      </div>
    </article>
  );
}

export default NewsCard;
