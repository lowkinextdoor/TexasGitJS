import React, { useState } from 'react';

export default function ColorChanger() {
  const [bgColor, setBgColor] = useState('white');
  const [darkMode, setDarkMode] = useState(false);

  const changeColor = (color) => {
    setBgColor(color);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentBackground = darkMode ? '#121212' : bgColor;
  const textColor = darkMode ? 'white' : 'black';

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: currentBackground,
        color: textColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={toggleDarkMode}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <div>
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('green')}>Green</button>
        <button onClick={() => changeColor('blue')}>Blue</button>
        <button onClick={() => changeColor('white')}>White</button>
      </div>
    </div>
  );
}
