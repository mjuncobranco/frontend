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
      setLoading(true); // Indicar que se está cargando
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/home/movies`
      );
      const data = await response.json();
      if (data.status === "success") {
        setMovies(data.movies);
        
      } else {
        console.error("Failed to fetch movies");
      }
    
    } catch (error) {
      console.error("Error fetching movies", error);
      setError(true);
    }finally {
      setLoading(false); // Indicar que la carga terminó
    }
  
  };

  // Add or remove a movie from favorites
  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieId)) {
        // If the movie is already in favorites, remove it
        return prevFavorites.filter((id) => id !== movieId);
      } else {
        // If the movie is not in favorites, add it
        return [...prevFavorites, movieId];
      }
    });
  };
  
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, favorites, loading,error, toggleFavorite }}>
      {children}
    </MoviesContext.Provider>
  );
};

// Prop types
MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
