import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

//creating authentication context
export const AuthContext = createContext();

//function to decode payload of JWT

const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

//Authentication provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //tracking errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //login function
  const login = async (email, password) => {
    setErrors({});
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        const decodedToken = decodeToken(data.token);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        setUser(decodedToken);
        navigate("/profile");
      } else {
        console.error(data.message);
        setErrors({ global: data.message });
      }
      //incorrect email or password entered
    } catch (error) {
      console.error("Error during login", error);
      setErrors({ global: "An error occurred. Please try again." });
    }
  };

  //register function
  const register = async (userData) => {
    setErrors({});
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.status === "success") {
        navigate("/login");
      } else {
        //specific errors controlled for email and nick
        const newErrors = { global: data.message };

        if (data.message === "Email already exists") {
          console.error(data.message);
          newErrors.email = "Email already exists. Please login.";
        }
        if (data.message === "Nick already exists") {
          console.error(data.message);
          newErrors.nick = "Nick already exists.Please login.";
        }
        setErrors(newErrors);

        // navigates to login after 3s if existing email/nick error
        if (newErrors.email || newErrors.nick) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("An error occurred. Please try again.", error);
      setErrors({ global: "An error occurred. Please try again." });
    }
  };
  // Function to logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    localStorage.removeItem("localUser");
    setUser(null);

    navigate("/login");
  };

  // Load user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUser = localStorage.getItem("localUser");
    if (localUser) {
      const localUserObject = JSON.parse(localUser);
      setUser(localUserObject);
    } else if (token) {
      const decodedUser = decodeToken(token); // Decodifica directamente desde el token
      console.log("Decoded User from Token:", decodedUser);
      const decodedUserId = decodedUser.id;
      console.log(decodedUserId);
      setUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    console.log("user changed", user);
    if (user != null) {
      let localUserString =
        typeof user == "string" ? user : JSON.stringify(user);
      localStorage.setItem("localUser", localUserString);
    }
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, errors, setErrors, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//defining prop types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
