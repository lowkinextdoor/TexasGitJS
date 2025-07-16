import React from 'react';

export default function ObjectComponent() {
  const person = {
    firstName: "Saneel",
    lastName: "Maharjan",
    age: 21,
    country: "Nepal",
    profession: "Developer"
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.name}>
          {person.firstName} {person.lastName}
        </h1>

        <p style={styles.profession}>{person.profession}</p>

        <div style={styles.section}>
          <h3 style={styles.heading}>Personal Info</h3>
          <p><strong>Age:</strong> {person.age}</p>
          <p><strong>Country:</strong> {person.country}</p>
        </div>

        <div style={styles.footer}>
          <p>📄 This is a basic CV</p>
        </div>
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
    padding: "20px"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: "36px",
    width: "100%",
    maxWidth: "520px",
    fontFamily: "'Benguiat Bold', serif",
    color: "#111",
    lineHeight: 1.6,
  },
  name: {
    fontSize: "32px",
    marginBottom: "8px",
    textAlign: "center",
    color: "#000",
  },
  profession: {
    fontSize: "20px",
    fontWeight: "normal",
    color: "#666",
    textAlign: "center",
    marginBottom: "24px",
  },
  section: {
    marginBottom: "20px",
  },
  heading: {
    fontSize: "20px",
    borderBottom: "1px solid #ccc",
    marginBottom: "12px",
    paddingBottom: "4px",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "14px",
    color: "#777",
  },
};
