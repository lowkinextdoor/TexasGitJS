import React, { useState } from 'react';

function FruitToolbox() {
  const [fruits, setFruits] = useState(["🍎 Apple", "🍌 Banana", "🥭 Mango"]);
  const [newFruit, setNewFruit] = useState("");

  // Function to add a new fruit
  const addFruit = () => {
    if (newFruit.trim() !== "") {
      setFruits([...fruits, newFruit]);
      setNewFruit("");
    }
  };

  // Function to clear all fruits
  const clearFruits = () => {
    setFruits([]);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addFruit();
    }
  };

  return (
    <div style={styles.container}>
      <h2>🍇 Fruit Toolbox</h2>

      <input
        type="text"
        placeholder="Enter a fruit (🍉)"
        value={newFruit}
        onChange={(e) => setNewFruit(e.target.value)}
        onKeyDown={handleKeyDown}  // ← Add this to handle Enter key
        style={styles.input}
      />

      <div style={styles.buttons}>
        <button onClick={addFruit} style={styles.button}>➕ Add</button>
        <button onClick={clearFruits} style={styles.button}>🗑️ Clear</button>
      </div>

      <div style={styles.listBox}>
        <h3>🍍 Fruit List:</h3>
        {fruits.length === 0 ? (
          <p>No fruits added yet!</p>
        ) : (
          <ul>
            {fruits.map((fruit, index) => (
              <li key={index}>{fruit}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    padding: '10px',
    width: '60%',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  buttons: {
    margin: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0 5px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
  listBox: {
    marginTop: '20px',
  }
};

export default FruitToolbox;
