import { useState } from "react";

import Board from "./components/board/Board";
import BoardModel from "./models/BoardModel";
import { PlayerColor } from "./models/PlayerModel";
import SquareModel from "./models/SquareModel";

const App = () => {
  const [board, setBoard] = useState(new BoardModel());
  const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

  const handleMove = (from: SquareModel, to: SquareModel) => {
    const newBoard = new BoardModel();
    newBoard.setBoard(board);
    newBoard.movePiece(from, to);
    setBoard(newBoard);
    setPlayerTurn(
      playerTurn === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE
    );
  };

  return (
    <>
      <h1>Chess App</h1>
      <Board
        board={board}
        playerTurn={playerTurn}
        playingAsWhite
        onMove={handleMove}
      />
    </>
  );
};

export default App;
