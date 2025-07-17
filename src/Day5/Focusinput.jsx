import React, { useRef, useState, useEffect } from 'react';
import './Focusinput.css';

function Focusinput() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const inputRef = useRef();

  const handleClick = () => {
    alert(`Input 1: ${input1}\nInput 2: ${input2}`);
    inputRef.current.focus(); // Refocus first input
  };

  // Optional: Auto-focus on load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="form-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Email"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        className="focus-input"
      />

      <input
        type="password"
        placeholder="Password"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        className="focus-input"
      />

      <button onClick={handleClick} className="submit-btn">
        Submit
      </button>
    </div>
  );
}

export default Focusinput;
