import React, { useState } from 'react';

function AuthSystem() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const correctUsername = "user";
  const correctPassword = "1234";

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("⚠️ Please enter both username and password.");
      return;
    }

    if (username === correctUsername && password === correctPassword) {
      const id = generateUserId(username);
      setUserId(id);
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("❌ Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setUserId("");
    setError("");
  };

  const generateUserId = (name) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return name.substring(0, 3).toUpperCase() + randomNum;
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {!isLoggedIn ? (
          <>
            <h2 style={styles.title}>🔐 Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleLogin} style={styles.loginBtn}>Log In</button>
            {error && <p style={styles.error}>{error}</p>}
          </>
        ) : (
          <>
            <h2 style={styles.title}>👋 Welcome, {username}!</h2>
            <p style={styles.info}>🆔 User ID: <strong>{userId}</strong></p>
            <button onClick={handleLogout} style={styles.logoutBtn}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    padding: '10px',
    width: '100%',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  loginBtn: {
    padding: '10px',
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '10px',
    width: '100%',
    backgroundColor: '#f44336',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  info: {
    fontSize: '16px',
    marginBottom: '20px',
  },
};

export default AuthSystem;
