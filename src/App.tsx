import { useState } from "react";

import Board from "./components/board/Board";
import BoardModel from "./models/BoardModel";
import { PlayerColor } from "./models/PlayerModel";

const App = () => {
  const [board] = useState(new BoardModel());
  const [playerTurn, setPlayerTurn] = useState<PlayerColor>(PlayerColor.WHITE);

  return (
    <>
      <h1>Chess App</h1>
      <Board board={board} playerTurn={playerTurn} playingAsWhite />
    </>
  );
};

export default App;
