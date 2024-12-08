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

      // Navega a login después de 3 segundos si hay errores de email o nick existentes
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
  // Load user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      const decodedUser = JSON.parse(storedUser);
      setUser(decodedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, errors, setErrors }}>
      {children}
    </AuthContext.Provider>
  );
};

//defining prop types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
