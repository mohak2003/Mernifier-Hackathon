// src/components/MyPage.js

import React, { useState } from 'react';

const MyPage = () => {
  // State for a simple counter
  const [count, setCount] = useState(0);

  // Event handler to increment the counter
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  function calculateCube(number) {
      return number * number * number;
  }
  

  return (
    <div>
      <h1>Welcome to My React Page!</h1>
      <p>This is a simple React page example.</p>
      <p>Current count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default MyPage;
