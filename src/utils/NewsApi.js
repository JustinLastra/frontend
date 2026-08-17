const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const PLACEHOLDER_API_KEYS = new Set([
  "",
  "your_news_api_key_here",
  "your_key_here",
]);

const mockArticles = [
  {
    source: { name: "Tech Daily" },
    title: "The Future of Renewable Energy",
    description:
      "Scientists explore new ways to harness solar and wind power efficiently.",
    url: "https://example.com/article-1",
    urlToImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
    publishedAt: new Date().toISOString(),
  },
  {
    source: { name: "World News" },
    title: "Global Markets Show Signs of Recovery",
    description:
      "Economists report positive trends across major international markets.",
    url: "https://example.com/article-2",
    urlToImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    source: { name: "Science Today" },
    title: "Breakthrough in Quantum Computing Research",
    description:
      "Researchers achieve a new milestone in quantum processor stability.",
    url: "https://example.com/article-3",
    urlToImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    source: { name: "Health Weekly" },
    title: "New Study Highlights Benefits of Mediterranean Diet",
    description:
      "Long-term research confirms health advantages of traditional eating patterns.",
    url: "https://example.com/article-4",
    urlToImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    source: { name: "Space Explorer" },
    title: "NASA Announces Plans for Next Mars Mission",
    description:
      "The agency reveals timeline and objectives for upcoming exploration efforts.",
    url: "https://example.com/article-5",
    urlToImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    source: { name: "Culture Magazine" },
    title: "Art Exhibition Draws Record Crowds in New York",
    description:
      "A contemporary art showcase becomes the most visited event of the season.",
    url: "https://example.com/article-6",
    urlToImage:
      "https://images.unsplash.com/photo-1460661419641-bea0fb2f8772?w=400",
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getDateRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);

  return {
    from: formatDate(from),
    to: formatDate(to),
  };
}

function filterMockArticles(keyword) {
  const query = keyword.toLowerCase();
  const filtered = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.source.name.toLowerCase().includes(query),
  );

  return filtered.length > 0 ? filtered : mockArticles;
}

function hasValidApiKey(apiKey) {
  return apiKey && !PLACEHOLDER_API_KEYS.has(apiKey.trim());
}

async function getMockArticles(keyword) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return filterMockArticles(keyword);
}

export async function searchNews(keyword) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY?.trim();

  if (!hasValidApiKey(apiKey)) {
    return getMockArticles(keyword);
  }

  const { from, to } = getDateRange();
  const params = new URLSearchParams({
    q: keyword,
    apiKey,
    from,
    to,
    pageSize: "100",
  });

  try {
    const response = await fetch(`${newsApiBaseUrl}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok || data.status === "error") {
      throw new Error(data.message || "News API request failed");
    }

    return data.articles || [];
  } catch (error) {
    if (!import.meta.env.PROD) {
      console.warn("News API unavailable, using mock data:", error.message);
      return getMockArticles(keyword);
    }

    throw error;
  }
}
