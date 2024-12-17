import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MoviesContext } from "../context/MoviesContext";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#fffff",
    minHeight: "100vh",
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
  profile: {
    backgroundColor: "#ffffff",
    padding: "3rem",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #e50914",
    marginBottom: "1rem",
    objectFit: "cover",
  },
  uploadButton: {
    marginBottom: "1rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  userInfo: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  emailInfo: {
    color: "#666",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  favoritesSection: {
    marginTop: "2rem",
    textAlign: "left",
    borderTop: "1px solid #ddd",
    paddingTop: "1.5rem",
  },
  favoritesTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  favoriteItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: "1px solid #eee",
  },
  favoriteLink: {
    color: "#e50914",
    textDecoration: "none",
    fontSize: "1rem",
  },
  starIcon: {
    color: "#FFD700",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  deleteButton: {
    marginBottom: "1rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "0.2rem 0.5rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
};

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { movies, setFavorites, loading, error } = useContext(MoviesContext);
  const [avatar, setAvatar] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user != null && user.role == "admin") {
      fetch("http://localhost:5000/api/users/auth/users/list", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            setUsers(data.data);
          }
        });
    }
  }, [user]);

  //loading message..
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <span>🎬</span>
        <p style={styles.loadingText}>Loading Profile...</p>
      </div>
    );
  }
  //error message
  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.errorText}>
          Failed to load Profile. Please try again later.
        </p>
      </div>
    );
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/auth/settings/change-avatar",
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      console.log("Token sent:", localStorage.getItem("token"));

      const data = await response.json();
      if (data.status === "success") {
        // Actualiza el avatar en el estado global del usuario
        setUser((prevUser) => ({ ...prevUser, avatar: data.avatar }));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error uploading avatar", error);
    }
  };

  let favoriteMovies = movies.filter(
    (movie) => user.favoriteMovies && user.favoriteMovies.includes(movie._id)
  );
  console.log(favoriteMovies);

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/auth/favorites/${movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ movieId }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setUser((prevUser) => ({
          ...prevUser,
          favoriteMovies: prevUser.favoriteMovies.filter(
            (id) => id !== movieId
          ),
        }));
        setFavorites(data.favoriteMovies);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  const removeUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/auth/settings/delete-user`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ userId: userId }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        let adminUser = structuredClone(user);
        setUser(adminUser);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error removing user", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.profile}>
        {/*controlling img error for img when user avatar display error*/}
        <img
          src={
            user.avatar
              ? `http://localhost:5000/image/${user.avatar}`
              : "hmac=sZqH9D718kRNYORntdoWP-EehCC83NaK3M-KTWvABIg"
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://fastly.picsum.photos/id/482/200/300.jpg?hmac=sZqH9D718kRNYORntdoWP-EehCC83NaK3M-KTWvABIg";
          }}
          alt="User Avatar"
          style={styles.avatar}
        />
        <h2 style={styles.userInfo}>{user.name || "Guest"}</h2>
        <p style={styles.emailInfo}>{user.email || "No email available"}</p>

        <input
          type="file"
          id="avatar"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        {/* changing user's avatar by choosing img file */}
        <label htmlFor="avatar" style={styles.uploadButton}>
          Change Avatar
        </label>

        <div style={styles.favoritesSection}>
          <h3 style={styles.favoritesTitle}>Your Favorite Movies:</h3>
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
              <div key={movie._id} style={styles.favoriteItem}>
                <a href={`/movies/${movie._id}`} style={styles.favoriteLink}>
                  {movie.title}
                </a>
                {/*handling removing favorite movie onClick by movieId */}
                <span
                  style={styles.starIcon}
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  ⭐
                </span>
              </div>
            ))
          ) : (
            <p>No favorite movies added yet.</p>
          )}
        </div>
        {user.role == "admin" && (
          <div style={styles.favoritesSection}>
            {/* for admin only, showcasing users list & allow user removal */}
            <h2>User Administration</h2>
            <ul>
              {users.map((user) => {
                return (
                  <li key={user._id} style={{ marginBottom: "0.8rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h4>{user.name}</h4>
                      <button
                        onClick={() => removeUser(user._id)}
                        style={styles.deleteButton}
                      >
                        DELETE
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
