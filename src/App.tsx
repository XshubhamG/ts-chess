import { useState } from 'react';

import Board from './components/board/Board';
import BoardModel from './models/BoardModel';

const App = () => {
  const [board] = useState(new BoardModel());

  return (
    <>
      <h1>Chess App</h1>
      <div>
        <Board board={board} playingAsWhite />
      </div>
    </>
  );
};

export default App;
