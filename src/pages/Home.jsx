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
    textAlign: "center",
    marginTop: "50px",
  },
};

const Home = () => {
  const { movies, loading, error } = useContext(MoviesContext);

  console.log("Home rendered", movies);
  //loading message..
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Loading movies...</p>
      </div>
    );
  }
  //error message
  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <p>Failed to load movies. Please try again later.</p>
      </div>
    );
  }
  return (
    <div style={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
