import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import "./App.css";

function App() {
  const handleSearch = () => {};

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />
      <Main articles={[]} isLoading={false} />
      <About />
      <Footer />

      <LoginModal isOpen={false} onClose={() => {}} />
      <RegisterModal isOpen={false} onClose={() => {}} />
    </div>
  );
}

export default App;
