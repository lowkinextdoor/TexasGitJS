import React from "react";

export default function Array1() {
  const royalEnfieldBikes = [
    "Classic 350",
    "Bullet 350",
    "Meteor 350",
    "Hunter 350",
    "Himalayan 450",
    "Scram 411",
    "Super Meteor 650",
    "Interceptor 650",
    "Continental GT 650"
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Royal Enfield Bikes</h1>
        <ul style={styles.list}>
          {royalEnfieldBikes.map((bike, index) => (
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
