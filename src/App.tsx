import { useState } from "react";

import Board from "./components/board/Board";
import BoardModel from "./models/BoardModel";

const App = () => {
  const [board] = useState(new BoardModel());

  return (
    <>
      <h1>Chess App</h1>
      <main>
        <Board board={board} playingAsWhite />
      </main>
    </>
  );
};

export default App;
