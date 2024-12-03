import { Link } from "react-router-dom";
const styles = {
  footer: { 
    backgroundColor: "#1c1c1c",
    color: "#fff",
    textAlign: "center",
    padding: "1rem",
    marginTop: "2rem",
    fontSize: "0.9rem",
  },
  link: {
    color: "#4caf50",
    textDecoration: "none",
    marginLeft: "10px",
  },

};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>
        &copy; 2024 MovieApp.
        <Link to="/contact/message" style={styles.link}>
          Contact Us
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
