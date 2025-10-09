import type BoardModel from "../../models/BoardModel";
import type SquareModel from "../../models/SquareModel";

import Square from "./Square";

interface Props {
  board: BoardModel;
  playingAsWhite: boolean;
}

const asWhite = (square: SquareModel, isTrue: boolean): string => {
  return `col-start-${isTrue ? square.column + 1 : 8 - square.column} row-start-${isTrue ? 8 - square.row : square.row + 1}`;
};

const Board = ({ board, playingAsWhite }: Props) => {
  return (
    <div className="mx-auto max-w-2xl">
      <section
        className={`mx-auto my-4 grid aspect-square grid-cols-8 grid-rows-8 border`}>
        {board.squares.map((square: SquareModel) => (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`h-full w-full ${asWhite(square, playingAsWhite)} ${square.isLightSquare() ? "bg-gray-100" : "bg-amber-700"}`}>
            <Square
              square={square}
              showCoordinateRow={square.column == 0}
              showCoordinateColumn={square.row == 0}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Board;
