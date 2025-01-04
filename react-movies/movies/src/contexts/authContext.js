import React, { useState, createContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/movies-api";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result.token) {
        setToken(result.token);
        setIsAuthenticated(true);
        setUserName(username);
      } else {
        console.error("Authentication failed:", result.message);
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const result = await signup(username, password);
      return result.code === 201;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default AuthContextProvider;
