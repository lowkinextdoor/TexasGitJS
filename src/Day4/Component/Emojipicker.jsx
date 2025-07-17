import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Emojipicker() {
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");

  const handleEmojiClick = (emojiData) => {
    console.log("Emoji clicked:", emojiData.emoji);
    alert("Emoji: " + emojiData.emoji);
    setInput((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div style={styles.container}>
      <h3>Emoji Picker 😄</h3>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Type something..."
        />
        <button onClick={() => setShowPicker((prev) => !prev)} style={styles.button}>
          😊
        </button>
      </div>

      {showPicker && (
        <div style={styles.picker}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    fontFamily: "sans-serif"
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    fontSize: "20px",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff"
  },
  picker: {
    marginTop: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    zIndex: 999
  }
};