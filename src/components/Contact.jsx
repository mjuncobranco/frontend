import { useState } from "react";

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
    margin: "0",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  input: {
    width: "93%",
    padding: "0.8rem",
    margin: "0.8rem 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "0.5rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
  },
  success: {
    color: "green",
    fontSize: "0.8rem",
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  //preventing page refresh and handling error & success state
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    //validation

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    try {
      //sending data
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/contact/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      //
      if (!response.ok) {
        // Handling HTTP errors (e.g., 400 or 500)
        throw new Error("Failed to send message. Please try again.");
      }
      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(
          data.message ||
            "Failed to send message. All fields are required. Please try again."
        );
      }
    } catch (error) {
      setError(
        error.message || "A server error has occured. Please try again."
      );
    }
  };
  return (
    <div style={styles.pageContainer}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          style={styles.input}
          name="message"
          placeholder="Your message"
          value={formData.message}
          rows="5"
          onChange={handleChange}
        />
        <button style={styles.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
