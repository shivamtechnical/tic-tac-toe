import React, { useState } from "react";
import Board from "./components/board.jsx";
import History from "./components/History.jsx";
import { calculateWinner } from "./helpers.js";
import StatusMessage from "./components/statusMessage.jsx";

import "./styles/root.scss";

const NEW_GAME = [{ board: Array(9).fill(null), isNext: true }];
const App = () => {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory((prev) => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((squar, pos) => {
        if (pos === position) {
          return last.isXNext ? "X" : "0";
        }

        return squar;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });

    setCurrentMove((prev) => prev + 1);
  };
  const moveTo = (move) => {
    setCurrentMove(move);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };
  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE{" "}
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? "active" : ""}`}
      >
        {" "}
        Start new game
      </button>
      <h2 style={{ fontweight: "normal" }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>
  );
};

export default App;
