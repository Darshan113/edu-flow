import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  return <p>⏱️ Seconds: {seconds}</p>;
}

// | Dependencies | When it runs         |
// | ------------ | -------------------- |
// | `[]`         | only once (mount)    |
// | `[value]`    | when `value` changes |
// | no deps      | after every render   |
