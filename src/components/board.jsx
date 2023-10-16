import React from "react";
import Squar from "./squar.jsx";

const Board = (props) => {
  const { board, handleSquareClick, winningSquares } = props;
  const renderSquare = (position) => {
    const iswinningSquare = winningSquares.includes(position);

    return (
      <Squar
        value={board[position]}
        onClick={() => handleSquareClick(position)}
        iswinningSquare={iswinningSquare}
      />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
export default Board;
