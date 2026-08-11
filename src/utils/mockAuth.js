const TOKEN_KEY = "jwt";
const SAVED_ARTICLES_KEY = "savedArticles";

function delay(result, ms = 300) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), ms);
  });
}

function getSavedFromStorage() {
  try {
    const stored = localStorage.getItem(SAVED_ARTICLES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveToStorage(articles) {
  localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(articles));
}

export async function login(email, password) {
  if (!email || !password) {
    throw new Error("Invalid credentials");
  }

  const token = `mock-jwt-${Date.now()}`;
  const user = { name: email.split("@")[0], email };
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("user", JSON.stringify(user));

  return delay({ token, user });
}

export async function register(email, password, name) {
  if (!email || !password || !name) {
    throw new Error("Invalid registration data");
  }

  const token = `mock-jwt-${Date.now()}`;
  const user = { name, email };
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("user", JSON.stringify(user));

  return delay({ token, user });
}

export async function checkToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return delay(user);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
}

export function getSavedArticles() {
  return getSavedFromStorage();
}

export async function saveArticle(article) {
  const saved = getSavedFromStorage();
  const exists = saved.some((item) => item.url === article.url);

  if (!exists) {
    saved.push(article);
    saveToStorage(saved);
  }

  return delay(saved);
}

export async function deleteArticle(articleUrl) {
  const saved = getSavedFromStorage().filter(
    (item) => item.url !== articleUrl,
  );
  saveToStorage(saved);
  return delay(saved);
}

export function isArticleSaved(articleUrl, savedArticles) {
  return savedArticles.some((item) => item.url === articleUrl);
}
