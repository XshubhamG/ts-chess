import { useState } from "react";
import type BoardModel from "../../models/BoardModel";
import type SquareModel from "../../models/SquareModel";

import type { PlayerColor } from "../../models/PlayerModel";
import Square from "./Square";

interface Props {
  board: BoardModel;
  playerTurn: PlayerColor;
  playingAsWhite: boolean;
  onMove: (from: SquareModel, to: SquareModel) => void;
}

const asWhite = (square: SquareModel, isTrue: boolean): string => {
  return `col-start-${isTrue ? square.column + 1 : 8 - square.column} row-start-${isTrue ? 8 - square.row : square.row + 1}`;
};

const Board = ({ board, playerTurn, playingAsWhite, onMove }: Props) => {
  const [selectedSquare, setSelectedSquare] = useState<SquareModel | null>(
    null
  );
  const [validMoves, setValidMoves] = useState<SquareModel[]>([]);

  const handleSquareSelect = (square: SquareModel | null) => {
    if (square === null) {
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    if (selectedSquare && validMoves.includes(square)) {
      onMove(selectedSquare, square);
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    if (square.piece?.color === playerTurn) {
      setSelectedSquare(square);
      setValidMoves(board.getValidMoves(square));
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <section
        className={`mx-auto my-4 grid aspect-square grid-cols-8 grid-rows-8 border`}>
        {board.squares.map((square: SquareModel) => (
          <div
            key={`square_${square.row}_${square.column}`}
            className={`h-full w-full ${asWhite(square, playingAsWhite)} `}>
            <Square
              square={square}
              showCoordinateRow={square.column == 0}
              showCoordinateColumn={square.row == 0}
              canSelect={square.piece?.color == playerTurn}
              isSelected={selectedSquare == square}
              isValidMove={validMoves.includes(square)}
              select={handleSquareSelect}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Board;
