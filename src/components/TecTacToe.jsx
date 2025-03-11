import React from "react";
import "./css/TecTacToe.css";
import Square from "./Square";
import { useState, useEffect } from "react";

export default function TecTacToe() {
  const renderSquares = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [gameState, setGameState] = useState(renderSquares);
  const [currPlayer, setCurrPlayer] = useState("circle");
  const [finishState, setFinishState] = useState(false);
  const [winnerRow, setWinnerRow] = useState([]);

  const checkWinner = () => {
    if (finishState) return;

    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setWinnerRow([
          row * 3 + 0,
          row * 3 + 1,
          row * 3 + 2,
        ]);
        return gameState[row][0];
      }
    }
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setWinnerRow([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }
    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
        setWinnerRow([0,4,8]);
      return gameState[1][1];
    }
    if (
      (gameState[0][2] === gameState[1][1] && gameState[1][1]) ===
      gameState[2][0]
    ) {
        setWinnerRow([2,4,6]);
      return gameState[1][1];
    }

    const isDraw = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") {
        // console.log("draw");
        return true;
      }
    });
    if(isDraw) return 'draw';

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishState(winner);
    }
    // console.log(winner);
  }, [gameState]);

  return (
    <>
      <div className="game-wrapper">
        <div className="players">
          <div className="player1">Player 1</div>
          <div className="player2">Player 2</div>
        </div>

        <div className="board">
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => {
              return (
                <Square
                winnerRow={winnerRow}
                  finishState={finishState}
                  currPlayer={currPlayer}
                  setGameState={setGameState}
                  setCurrPlayer={setCurrPlayer}
                  id={rowIndex * 3 + colIndex}
                  key={rowIndex * 3 + colIndex}
                />
              );
            })
          )}
        </div>

        <h2 className="finishstate">
          {finishState && finishState !== 'draw' ? `${finishState} won the game!` : ""}
          {finishState && finishState === 'draw' ? `It's a ${finishState}` : ""}
        </h2>
      </div>
    </>
  );
}
