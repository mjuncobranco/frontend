import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MoviesContext } from "../context/MoviesContext";
import { useState } from "react";

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    backgroundColor: "#1c1c1c",
    color: "#fff",
    flexWrap: "wrap",
  },
  logo: {
    cursor: "pointer",
    fontSize: "1.0rem",
    flexShrink: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
    padding:"10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  button: {
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    margin: "10px",
    fontSize: "0.8rem",
    flexShrink: 0, 
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    flex: "1 1 100%", 
    maxWidth: "300px", 
    
  },
  searchInput: {
    padding: "0.4rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#333",
    color: "#fff",
    outline: "none",
    fontSize: "0.9rem",
    transition: "box-shadow 0.3s",
    width: "90%", 
    maxWidth: "280px", // limits max. size
  },
  searchInputActive: {
    boxShadow: "0 0 10px yellow",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 5px)",
    left: 0,
    width: "100%",
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "#222",
    borderRadius: "4px",
    border: "1px solid #444",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "0.5rem",
    color: "#fff",
    cursor: "pointer",
    borderBottom: "1px solid #333",
    textAlign: "left",
  },
  dropdownItemHover: {
    backgroundColor: "#444",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    flexShrink:0,
  },
};

const Header = () => {
  const { user, logout } = useContext(AuthContext);//auth user
  const {movies} = useContext(MoviesContext);//fetch movies
  const [searchQuery, setSearchQuery]= useState("");//query to filter movies
  const navigate = useNavigate();
 // handling input change
 const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

// filtering movies by title
const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchQuery.toLowerCase()) // Compara el título en minúsculas
);
//logging out
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate("/")}>
        <h1>🎬 MovieApp</h1>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          />
          {/* showing dropdown with search result */}
        {searchQuery && (
          <div style={styles.dropdown}>
            {filteredMovies.map((movie) => (
              <div
                key={movie._id}
                style={styles.dropdownItem}
                onClick={() => {navigate(`/movies/${movie._id}`);
                setSearchQuery("");}} // Navigating to movieDetails
              >
                {movie.title}
              </div>
            ))}
          </div>
        )}
        
      </div>

      <nav style={styles.nav}> {/*nav bar with avatar & logout button if user is logged in OR login/register if not*/}
        {user ? (
          <>
            <Link to="/profile">
              <img
                src={ user.avatar ? `http://localhost:5000/image/${user.avatar}`:
                "hmac=sZqH9D718kRNYORntdoWP-EehCC83NaK3M-KTWvABIg"
              } onError={({currentTarget})=>{
                currentTarget.onerror = null;
                currentTarget.src="https://fastly.picsum.photos/id/482/200/300.jpg?hmac=sZqH9D718kRNYORntdoWP-EehCC83NaK3M-KTWvABIg"
              }} 
                alt="User Avatar"
                style={styles.avatar}
              />
            </Link>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : ( 
          <>
            <Link to="/login" style={styles.button}>
              Login
            </Link>
            <Link to="/register" style={styles.button}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
