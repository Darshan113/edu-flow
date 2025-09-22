import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <p className="mb-2">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Increment
      </button>
    </div>
  );
}
