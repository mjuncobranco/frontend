import { createContext, useState, useEffect } from "react";

import PropTypes from "prop-types";
//creating movieContext
export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // loading...
  const [error, setError] = useState(null); // error

  // Fetch movies just once at the beginning
  const fetchMovies = async () => {
    try {
      setLoading(true); // controlling loading: if loading, show msg
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/home/movies`
      );
      const data = await response.json();
      if (data.status === "success") {//fetched movies ok
        setMovies(data.movies);
      } else {
        console.error("Failed to fetch movies");
      }
    } catch (error) {
      console.error("Error fetching movies", error); //failed to fetch movies
      setError(true);
    } finally {
      setLoading(false); // loading complete msg
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{ movies, favorites, loading, error, setFavorites }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// Prop types
MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
