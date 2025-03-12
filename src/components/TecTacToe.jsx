import React from "react";
import "./css/TecTacToe.css";
import Square from "./Square";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

export default function TecTacToe() {
  const renderSquares = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [gameState, setGameState] = useState(renderSquares);
  const [currPlayer, setCurrPlayer] = useState("circle");
  const [finishState, setFinishState] = useState(false);
  const [winnerLine, setWinnerLine] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [opponent, setOpponent] = useState(null);

  const checkWinner = () => {
    if (finishState) return;

    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setWinnerLine([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setWinnerLine([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }
    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      setWinnerLine([0, 4, 8]);
      return gameState[1][1];
    }
    if (
      (gameState[0][2] === gameState[1][1] && gameState[1][1]) ===
      gameState[2][0]
    ) {
      setWinnerLine([2, 4, 6]);
      return gameState[1][1];
    }

    const isDraw = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") {
        // console.log("draw");
        return true;
      }
    });
    if (isDraw) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishState(winner);
    }
    // console.log(winner);
  }, [gameState]);

  socket?.on("connect", function () {
    setPlayOnline(true);
  });
  socket?.on("OpponentNotFound", function () {
    setOpponent(false);
  });
  socket?.on("OpponentFound", function () {
    setOpponent(Data.opponent);
  });

  const takePlayerName = async () => {
    const result = await Swal.fire({
      title: "Enter your Name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "you need to enter your name";
        }
      },
    });
    return result;
  };

  async function handlePlayOnlineClick() {
    const result = await takePlayerName();
    // console.log(result);
    if (!result.isConfirmed) {
      return;
    }
    const userName = result.value;
    setPlayerName(userName);

    const newSocket = io("http://localhost:3000", {
      autoConnect: true,
    });

    newSocket?.emit("request_to_play", {
      playerName: userName,
    });

    setSocket(newSocket);
  }

  if (!playOnline) {
    return (
      <>
        <div className="game-wrapper">
          <button className="btn" onClick={handlePlayOnlineClick}>
            Play Online
          </button>
        </div>
      </>
    );
  }

  if (playOnline && !opponent) {
    return (
      <div className="game-wrapper">
        <p className="waiting">waiting for opponent. </p>
      </div>
    );
  }

  return (
    <>
      <div className="game-wrapper">
        <div className="players">
          <div className="player1">{playerName}</div>
          <div className="player2">{opponent}</div>
        </div>

        <div className="board">
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => {
              return (
                <Square
                  winnerLine={winnerLine}
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
          {finishState && finishState !== "draw"
            ? `"${finishState}" won the game!`
            : ""}
          {finishState && finishState === "draw"
            ? `It's a "${finishState}"`
            : ""}
        </h2>
      </div>
    </>
  );
}
