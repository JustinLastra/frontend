import { getArticleLink, formatArticleFromBackend } from "./articles.js";
import { getToken } from "./auth.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getSavedArticles() {
  const response = await fetch(`${BASE_URL}/articles`, {
    headers: authHeaders(),
  });

  const articles = await parseResponse(response);
  return articles.map(formatArticleFromBackend);
}

export async function saveArticle(article, keyword) {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source?.name || article.source || "Unknown",
      link: getArticleLink(article),
      image: article.urlToImage || null,
    }),
  });

  const saved = await parseResponse(response);
  return formatArticleFromBackend(saved);
}

export async function deleteArticle(articleId) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  await parseResponse(response);
}

export function isArticleSaved(article, savedArticles) {
  const link = getArticleLink(article);
  return savedArticles.some((item) => getArticleLink(item) === link);
}

export function findSavedArticle(article, savedArticles) {
  const link = getArticleLink(article);
  return savedArticles.find((item) => getArticleLink(item) === link);
}
