import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to handle errors
    const location = useLocation();

    const { from } = location.state || { from: "/" };

    const loginUser = async () => {
        try {
            const success = await context.authenticate(userName, password);
            if (!success) {
                setError("Invalid username or password.");
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.");
        }
    };

    if (context.isAuthenticated) {
        return <Navigate to={from} />;
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
        link: {
            marginTop: "10px",
            color: "#007bff",
            textDecoration: "none",
        },
        error: {
            color: "red",
            marginBottom: "10px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Login Page</h2>
                <p>You must log in to view the protected pages.</p>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    id="username"
                    aria-label="Username"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={styles.input}
                />
                <input
                    id="password"
                    aria-label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    onClick={loginUser}
                >
                    Log in
                </button>
                <p>
                    Not Registered? <Link to="/signup" style={styles.link}>Sign Up!</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
