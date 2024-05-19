"use client";

import { useRef, useState } from "react";

const Counter = () => {
  const countRef = useRef(0);
  const [, forceUpdate] = useState(); // Create a dummy state to trigger re-renders

  const handleClick = () => {
    countRef.current += 1;
    forceUpdate({}); // Trigger a re-render
    console.log(countRef.current); // Output the updated count without re-render
  };

  return (
    <div className="mt-24">
      <p>You clicked {countRef.current} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Counter;
