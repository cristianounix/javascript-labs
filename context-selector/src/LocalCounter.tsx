import { useState } from "react";

export const LocalCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      {Math.random()}
      <div>
        <span>LocalCount: {count}</span>
        <button type="button" onClick={() => setCount(count+1)}>+1</button>
        <button type="button" onClick={() => setCount(count-1)}>-1</button>
      </div>
    </div>
  );
};