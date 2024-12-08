import { useState, useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#333",
  },
  input: (isError = false) => ({
    width: "93%",
    padding: "0.8rem",
    margin: "0.8rem 0",
    borderRadius: "5px",
    border: isError ? "2px solid red" : "1px solid #ccc",
  }),
  
  errorText: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "-0.5rem",
    marginBottom: "0.5rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: "1rem",
    color: "#333",
    textDecoration: "none",
  },
};

//login
const Login = () => {
  const { login, errors, setErrors } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear errors when the component mounts
  useEffect(() => {
    setErrors({});
  }, [setErrors]);
  //preventing page refresh
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  console.log("handleSubmit", { email, password });
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login</h2>
        <input
          style={styles.input(errors.email)}
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        {errors.email && <p style={styles.errorText}></p>}
        <input
          style={styles.input(errors.password)}
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        {errors.password && <p style={styles.errorText}>{errors.password}</p>}
        {errors.global && <p style={styles.errorText}>{errors.global}</p>}
        <button style={styles.button} type="submit">
          Login
        </button>
        <Link to="/register" style={styles.link}>
          Don&apos;t have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Login;
