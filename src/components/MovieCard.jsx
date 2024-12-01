import { useContext } from "react";
import PropTypes from "prop-types";
import { MoviesContext } from "../context/MoviesContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons"; // Estrella amarilla
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons"; // Estrella gris

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    maxWidth: "500px",
    margin: "10px",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontSize: "1.2rem",
    margin: "0.5rem",
    textAlign: "center",
    height: "3rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  description: {
    fontSize: "0.9rem",
    color: "#555",
    margin: "0.5rem",
    textAlign: "justify",
    height: "3rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
    borderTop: "1px solid #ddd",
    marginTop: "auto",
  },
  button: {
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  starIcon: {
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
  },
};

const MovieCard = ({ movie }) => {
  //Add or remove favorite movie
  const { favorites, toggleFavorite } = useContext(MoviesContext);
  const navigate = useNavigate();
  console.log("movie en movie card", { movie });
  console.log("movie_id", movie._id);

  const isFavorite = favorites.includes(movie._id);

  return (
    <div style={styles.card}>
      <img
        src={movie.image}
        alt={movie.title}
        style={styles.image}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/150x225.png?text=No+Image";
        }}
      />
      <h3 style={styles.title}>{movie.title}</h3>
      <p style={styles.description}>{movie.description.slice(0, 100)}...</p>
      <div style={styles.footer}>
        <span onClick={() => toggleFavorite(movie._id)}>
          <FontAwesomeIcon
            icon={isFavorite ? faSolidStar : faRegularStar} 
            style={styles.starIcon}
            color={isFavorite ? "#FFD700" : "#ccc"} // solid yellow star or gray
          />
        </span>
        
        <button
        //navigate to see movie details
          onClick={() => navigate(`/movies/${movie._id}`)}
          style={styles.button} 
        >
          Details
        </button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
