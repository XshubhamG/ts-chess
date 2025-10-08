import type BoardModel from "../../models/BoardModel";
import type SquareModel from "../../models/SquareModel";
import { isLightSquare } from "../../services/square-service";
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
      <h2>Board</h2>
      <section
        className={`mx-auto my-4 grid aspect-square grid-cols-8 grid-rows-8 border`}>
        {board.squares.map((square: SquareModel) => (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`h-full w-full ${asWhite(square, playingAsWhite)} ${isLightSquare(square) ? "bg-slate-50" : "bg-amber-700"}`}>
            <Square square={square} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Board;
