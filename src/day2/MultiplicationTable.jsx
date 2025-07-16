import React, { useState } from "react";

export default function MultiplicationTable() {
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d+$/.test(val)) {
      setNumber(val);
    }
  };

  const num = Number(number);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Multiplication Table</h1>

      <input
        type="text"
        value={number}
        onChange={handleChange}
        placeholder="Enter a number"
        style={styles.input}
      />

      {number !== "" && !isNaN(num) && (
        <div style={styles.table}>
          {[...Array(10)].map((_, i) => {
            const multiplier = i + 1;
            return (
              <div key={multiplier} style={styles.row}>
                <span>{num}</span>
                <span style={styles.operator}>×</span>
                <span>{multiplier}</span>
                <span style={styles.operator}>=</span>
                <span>{num * multiplier}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 360,
    margin: "50px auto",
    padding: 25,
    border: "3px solid #444",
    borderRadius: 8,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    marginBottom: 24,
    fontWeight: "700",
    fontSize: 26,
    color: "#222",
  },
  input: {
    width: "100%",
    fontSize: 22,
    padding: "10px 10px",
    borderRadius: 6,
    border: "1px solid #888",
    marginBottom: 30,
    textAlign: "center",
  },
  table: {
    fontSize: 20,
    lineHeight: 1.6,
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 8,
    fontWeight: "600",
  },
  operator: {
    color: "#555",
  },
};
