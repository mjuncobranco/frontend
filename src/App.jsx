import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home/movies");
        const data = await response.json();
      console.log(data)

        if (data.status === "success") {
          setMovies(data.movies);
        } else {
          setError("Error fetching movies");
        }
        setLoading(false);
      } catch (error) {
        setError("Server error: Unable to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
 
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading movies...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Movies List</h1>
      <ul style={styles.list}>
        {movies.map((movie) => (
          <li key={movie._id} style={styles.movieItem}>
            <h3 style={styles.movieTitle}>{movie.title}</h3>
            <h3 style={styles.movieYear}>{movie.year}</h3>
            <img src={movie.image}/>
            <p style={styles.movieDescription}>{movie.description}</p>
            <small style={styles.movieDirector}>Directed by: {movie.director}</small>
            <p style={styles.movieCategory}>Category: {movie.category}</p>
            <a href={movie.trailer}>Watch Trailer</a>

          </li>
        ))}
      </ul>
    </div>
  );
}

// Estilos en línea
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  movieItem: {
    backgroundColor: "#fff",
    margin: "10px 0",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  movieTitle: {
    fontSize: "1.2em",
    marginBottom: "5px",
    color: "#2c3e50",
  },

  movieDescription: {
    marginBottom: "10px",
    color: "#7f8c8d",
  },
  movieDirector: {
    fontSize: "0.9em",
    color: "#95a5a6",
  },
  movieYear: {
    fontSize: "0.9em",
    color: "#95a5a6",
  },
  loading: {
    textAlign: "center",
    color: "#3498db",
    fontSize: "1.5em",
  },
  error: {
    textAlign: "center",
    color: "#e74c3c",
    fontSize: "1.5em",
  },
};

export default App;