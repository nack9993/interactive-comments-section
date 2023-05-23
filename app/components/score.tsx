import { useState } from "react";

export default function Score({ score }: { score: number }) {
  const [s, setS] = useState(score);
  function increase() {
    setS(score + 1);
  }
  return (
    <div className="bg-gray w-[70px] rounded-md flex justify-around">
      <button onClick={increase}>+</button>
      {s}
      <button>-</button>
    </div>
  );
}
