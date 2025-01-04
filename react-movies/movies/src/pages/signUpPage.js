import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setError("Password must be at least 8 characters, include a letter, a number, and a special character.");
      return;
    }

    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await context.register(userName, password);
      setRegistered(true);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f7f7f7",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
    },
    card: {
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      textAlign: "center",
      width: "300px",
    },
    input: {
      margin: "10px 0",
      padding: "10px",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      width: "100%",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    error: {
      color: "red",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Sign Up Page</h2>
        <p>Create an account to access the app.</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          value={userName}
          placeholder="Username"
          onChange={(e) => {
            setUserName(e.target.value);
            setError(""); // Clear error on input change
          }}
        />
        <input
          style={styles.input}
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear error on input change
          }}
        />
        <input
          style={styles.input}
          value={passwordAgain}
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setPasswordAgain(e.target.value);
            setError(""); // Clear error on input change
          }}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
