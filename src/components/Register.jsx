import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "2rem",
    paddingTop: "80px",
    boxSizing: "border-box",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    boxSizing: "border-box",
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
    boxSizing: "border-box",
  }),

  errorText: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "-0.5rem",
    marginBottom: "0.5rem",
  },
  password: {
    listStyle: "none",
    padding: "0",
    marginTop: "1rem",
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
  span: {
    padding: "5px",
    marginLeft: "5px",
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: "1rem",
    color: "#333",
    textDecoration: "none",
  },
};

const Register = () => {
  const { register, errors, setErrors } = useContext(AuthContext);
  //userData
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nick, setNick] = useState("");

  //password validation
  const [validRequirements, setValidRequirements] = useState([]);

  //realtime password validator
  const passwordRequirements = [
    { rule: "At least 8-15 characters", regex: /^.{8,15}$/ },
    { rule: "At least one uppercase letter", regex: /[A-Z]/ },
    { rule: "At least one number", regex: /\d/ },
    { rule: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ },
  ];

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    //check which rules are met
    const validRules = passwordRequirements.filter((requirement) =>
      requirement.regex.test(newPassword)
    );
    setValidRequirements(validRules.map((req) => req.rule));
  };
  //validation before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!surname.trim()) newErrors.surname = "Surname is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!nick.trim()) newErrors.nick = "Nick is required.";
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else {
      const unmetRules = passwordRequirements.filter(
        (req) => !req.regex.test(password)
      );
      if (unmetRules.length > 0) {
        newErrors.password = "Password does not meet all requirements.";
      }
    }

    // updating errors on context
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  //submiting registration if data was validated ok
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await register({ name, surname, email, password, nick });
    }
  };

  //dinamic validation for password with colors red for error, green for success
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Sign up</h2>
        <input
          style={styles.input(errors.name)}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        {errors.name && <p style={styles.errorText}>{errors.name}</p>}
        <input
          style={styles.input(errors.surname)}
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Your Surname"
        />
        {errors.surname && <p style={styles.errorText}>{errors.surname}</p>}

        <input
          style={styles.input(errors.email)}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          placeholder="Your Email"
        />
        {errors.email && (
          <p style={styles.errorText}>
            {errors.email}{" "}
            {errors.email ===
              "Email already exists. Please try another email." && (
              <Link to="/login" style={{ color: "blue" }}>
                Login here
              </Link>
            )}
          </p>
        )}
        <input
          style={styles.input(errors.nick)}
          type="text"
          value={nick}
          onChange={(e) => setNick(e.target.value.toLowerCase())}
          placeholder="Your Nick"
        />
        {errors.nick && <p style={styles.errorText}>{errors.nick}</p>}
        <input
          style={styles.input(errors.password)}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Your Password"
        />
        {errors.password && <p style={styles.errorText}>{errors.password}</p>}
        <ul style={styles.password}>
          {passwordRequirements.map((requirement) => (
            <li
              key={requirement.rule}
              style={{
                display: "flex",
                alignItems: "center",
                color: validRequirements.includes(requirement.rule)
                  ? "green"
                  : "red",
              }}
            >
              <span
                style={{
                  color: validRequirements.includes(requirement.rule)
                    ? "green"
                    : "red",
                  size: "1rem",
                }}
              >
                {validRequirements.includes(requirement.rule) ? "✔️" : "❌"}
              </span>
              <span style={styles.span}>{requirement.rule}</span>
            </li>
          ))}
        </ul>

        <button style={styles.button} type="submit">
          Sign up
        </button>
        {/*navigating to login if existing user */}
        <Link to="/login" style={styles.link}>
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
