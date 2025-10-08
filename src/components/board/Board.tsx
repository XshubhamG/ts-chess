import type BoardModel from '../../models/BoardModel';
import type SquareModel from '../../models/SquareModel';
import Square from './Square';

interface Props {
  board: BoardModel;
  playingAsWhite: boolean;
}

const asWhite = (square: SquareModel, isTrue: boolean): string => {
  return `col-start-${isTrue ? square.column + 1 : 8 - square.column} row-start-${isTrue ? 8 - square.row : square.row + 1}`;
};

const Board = ({ board, playingAsWhite }: Props) => {
  return (
    <>
      <h2>Board</h2>
      <section className="grid grid-cols-8 grid-rows-8 bg-amber-100">
        {board.squares.map((square: SquareModel) => (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`aspect-square border-1 ${asWhite(square, playingAsWhite)}`}>
            <Square square={square} />
          </div>
        ))}
      </section>
    </>
  );
};

export default Board;
