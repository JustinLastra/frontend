import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage.jsx";
import { searchNews } from "../../utils/NewsApi.js";
import {
  checkToken,
  deleteArticle,
  getSavedArticles,
  login,
  logout,
  register,
  saveArticle,
} from "../../utils/mockAuth.js";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const initializeAuth = async () => {
      const user = await checkToken();
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.name);
        setSavedArticles(getSavedArticles());
      }
    };

    initializeAuth();
  }, []);

  const handleSearch = useCallback(async (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setError("");
    setVisibleCount(3);

    try {
      const results = await searchNews(keyword);
      setArticles(results);
    } catch {
      setArticles([]);
      setError(
        "Sorry, something went wrong during the request. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleLogin = async (credentials) => {
    try {
      const { user } = await login(credentials.email, credentials.password);
      setIsLoggedIn(true);
      setUserName(user.name);
      setSavedArticles(getSavedArticles());
      closeModals();
    } catch {
      setError(
        "Sorry, something went wrong during the request. Please try again later.",
      );
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const { user } = await register(
        credentials.email,
        credentials.password,
        credentials.name,
      );
      setIsLoggedIn(true);
      setUserName(user.name);
      setSavedArticles(getSavedArticles());
      closeModals();
    } catch {
      setError(
        "Sorry, something went wrong during the request. Please try again later.",
      );
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserName("");
    setSavedArticles([]);
  };

  const handleSaveClick = async (article) => {
    if (!isLoggedIn) {
      return;
    }

    const isSaved = savedArticles.some((item) => item.url === article.url);

    try {
      const updated = isSaved
        ? await deleteArticle(article.url)
        : await saveArticle(article);
      setSavedArticles(updated);
    } catch {
      setError(
        "Sorry, something went wrong during the request. Please try again later.",
      );
    }
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                onSearch={handleSearch}
                onLoginClick={openLoginModal}
                isLoggedIn={isLoggedIn}
                userName={userName}
                onLogoutClick={handleLogout}
              />
              <Main
                articles={visibleArticles}
                isLoading={isLoading}
                error={error}
                hasSearched={hasSearched}
                onShowMore={handleShowMore}
                hasMore={hasMore}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSaveClick={handleSaveClick}
              />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            isLoggedIn ? (
              <SavedNewsPage
                savedArticles={savedArticles}
                userName={userName}
                isLoggedIn={isLoggedIn}
                onSaveClick={handleSaveClick}
                onLoginClick={openLoginModal}
                onLogoutClick={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        onSubmit={handleLogin}
        onSwitchToRegister={openRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        onSubmit={handleRegister}
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
}

export default App;
