import React from "react";

export default function Array2() {
  const jawaBikes = [
    "Jawa 42",
    "Jawa Standard",
    "Jawa Perak",
    "Jawa 42 Bobber",
    "Jawa 350",
    "Jawa Khakhi",
    "Jawa Maroon Classic",
    "Jawa 42 Tawang Edition"
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Jawa Motorcycles</h1>
        <ul style={styles.list}>
          {jawaBikes.map((bike, index) => (
            <li key={index} style={styles.item}>
              {index + 1}. {bike}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: 32,
    width: "100%",
    maxWidth: 500,
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: 28,
    fontWeight: 600,
    color: "#111",
    marginBottom: 24,
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    color: "#333",
    fontSize: 18,
    fontWeight: 500,
  },
  item: {
    padding: "10px 0",
    borderBottom: "1px solid #eaeaea",
  },
};
