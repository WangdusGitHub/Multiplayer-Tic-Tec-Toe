import React from "react";
import { useState } from "react";

export default function Square({
  winnerRow,
  setFinishState,
  finishState,
  setGameState,
  id,
  currPlayer,
  setCurrPlayer,
}) {
  const [icon, setIcon] = useState(null);

  const renderCircle = () => <i className="fa-regular fa-circle"></i>;
  const renderCross = () => <i className="fa-solid fa-xmark"></i>;

  const handleClick = () => {
    if (!icon) {
      if (currPlayer === "circle") {
        setIcon(renderCircle);
      } else {
        setIcon(renderCross);
      }

      setCurrPlayer(currPlayer === "circle" ? "cross" : "circle");

      setGameState((prevState) => {
        let newState = [...prevState];
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = currPlayer;
        // console.log(newState);
        return newState;
      });
    }
  };
  return (
    <div
      className={`square ${
        winnerRow.includes(id) ? 'highlight-winner-row' : ""
      }`}
      onClick={finishState ? null : handleClick}
    >
      {icon}
    </div>
  );
}
