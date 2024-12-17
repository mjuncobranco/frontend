import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";
import { AuthContext } from "../context/AuthContext";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    minHeight: "calc(100vh - 120px)", //adjusting size to avoid header & footer overlapping
    color: "#333",
    flexWrap: "wrap",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    maxWidth: "800px",
    width: "100%",
    padding: "2rem",
    gap: "1rem",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "10px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  director: {
    fontSize: "1rem",
    color: "#888",
    marginBottom: "1rem",
    textAlign: "center",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
    textAlign: "justify",
  },
  metaInfo: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "1rem",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
    gap: "1rem",
    flexWrap: "wrap",
  },
  button: {
    flex: "1 1 calc(50% - 1rem)",
    padding: "0.8rem 1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#e50914",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  trailerButton: {
    backgroundColor: "#0056b3",
    color: "#fff",
    textDecoration: "none",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    height: "70vh",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: "1.4rem",
    color: "green",

    padding: "0.8rem",
  },
  errorText: {
    fontSize: "1.4rem",
    color: "red",
  },
};

const MovieDetail = () => {
  const { id } = useParams();
  const { movies, setFavorites, loading, error } = useContext(MoviesContext);//movies data
  const { user, setUser } = useContext(AuthContext);//auth user & token data

  const navigate = useNavigate();
  console.log(useParams());
  console.log({ movies, id });

  // while loading movies
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <span>🎬</span>
        <p style={styles.loadingText}>Loading movie details...</p>
      </div>
    );
  }

  // fetching failed, error message
  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.errorText}>
          Failed to load movie details. Please try again later.
        </p>
      </div>
    );
  }
  //finding movie by id
  const movie = movies.find((m) => m._id.toString() === id);
//movie id not found error message
  if (!movie) {
    return <p>Movie not found</p>;
  }
  //adding movie to user's favorite list
  const handleAddToFavorites = () => {
//if no user
    if (!user) {
      navigate("/login");
    } else {
      // check if its a favorite movie or not
    if(user.favoriteMovies.includes(movie._id)){
      //case 1: its a favorite and needs to be removed
      try {
         const data = fetch(`http://localhost:5000/api/users/auth/favorites/${movie._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }).then((response) => response.json()).then((data) => {
          if (data.status === "success") {
            let updatedUser = structuredClone(user);
                updatedUser.favoriteMovies = data.favoriteMovies;
                setUser(updatedUser);
                setFavorites(updatedUser.favoriteMovies);

          } else {
            console.error(data.message);
          }
         });
  
      } catch (error) {
        console.error("Error removing favorite", error);
      }
      } else {
            //case 2: new favorite to add
            try {
              fetch(`http://localhost:5000/api/users/auth/favorites/${movie._id}`, {
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
                 Authorization: `${localStorage.getItem("token")}`,
               },
             }).then((response) => response.json()).then((data) => {
              if (data.status === "success") {
                let updatedUser = structuredClone(user);
                updatedUser.favoriteMovies = data.favoriteMovies;
                setUser(updatedUser);
                setFavorites(updatedUser.favoriteMovies);
              } else {
                console.error(data.message);
              }
             });
             
           } catch (error) {
             console.error("Error removing favorite", error);
           }
      }
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.detailsCard}>
        <img src={movie.image} alt={movie.title} style={styles.image} />
        <h2 style={styles.title}>{movie.title}</h2>
        <p style={styles.director}>
          Directed by: {movie.director} | Year: {movie.year}
        </p>
        <p style={styles.metaInfo}>
          Starring: {movie.actors} | Category: {movie.category}
        </p>
        <p style={styles.description}>{movie.description}</p>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleAddToFavorites}>
            {user && user.favoriteMovies.includes(movie._id)
              ? "Unfavorite"
              : "Add to Favorites"}
          </button>
          <a
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.button, ...styles.trailerButton }}
          >
            Watch Trailer
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
