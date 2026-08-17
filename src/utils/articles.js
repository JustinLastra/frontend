export function getArticleLink(article) {
  return article?.link || article?.url || "";
}

export function formatArticleFromBackend(article) {
  return {
    _id: article._id,
    keyword: article.keyword,
    url: article.link,
    title: article.title,
    description: article.text,
    publishedAt: article.date,
    urlToImage: article.image,
    source: { name: article.source },
  };
}

export function getSourceName(article) {
  if (!article?.source) {
    return "";
  }

  return typeof article.source === "string"
    ? article.source
    : article.source.name;
}
