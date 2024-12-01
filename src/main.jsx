import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MoviesProvider } from "../src/context/MoviesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoviesProvider>
    <App />
    </MoviesProvider>
  </StrictMode>,
);
