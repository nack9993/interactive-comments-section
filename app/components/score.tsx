import { useState } from "react";

export default function Score({ score }: { score: number }) {
  const [s, setS] = useState(score);
  function increase() {
    setS(score + 1);
  }
  return (
    <div className="w-[70px] p-1 rounded-md flex justify-around items-center bg-light-gray">
      <button className=" text-light-grayish-blue" onClick={increase}>
        +
      </button>
      <b className="text-sm text-moderate-blue">{s}</b>
      <button className="text-light-grayish-blue">-</button>
    </div>
  );
}
