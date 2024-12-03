import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
// import "./App.css";
function App() {
  console.log("app rendered");
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/message" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
