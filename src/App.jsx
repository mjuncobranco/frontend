import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import MovieDetail from "./pages/MovieDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  console.log("app rendered");
  return (
    <Router>
      <AuthProvider>
      <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact/message" element={<Contact />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
