import { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";
import MovieCard from "../components/MovieCard";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
    padding: "1rem",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "30px",
    height: "70vh",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: "1.4rem",
    color: "green",
    padding: "0.8rem"
   
  },
  errorText: {
    fontSize: "1.4rem",
    color: "red",
  },
};

const Home = () => {
  //importing from moviesContext 
  const { movies, loading, error } = useContext(MoviesContext);

  console.log("Home rendered", movies);
  //loading message..
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <span>🎬</span>
        <p style={styles.loadingText}>Loading movies...</p>
      </div>
    );
  }
  //error message when fetching movies
  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.errorText}>
          Failed to load movies. Please try again later.
        </p>
      </div>
    );
  }
  //mapping movies fetched from db rendering movieCard component
  return (
    <div style={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
