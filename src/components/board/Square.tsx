import { useMemo } from "react";
import { PlayerColor } from "../../models/PlayerModel";
import type SquareModel from "../../models/SquareModel";

interface Props {
  square: SquareModel;
  showCoordinateRow: boolean;
  showCoordinateColumn: boolean;
  canSelect: boolean;
  isSelected?: boolean;
  isValidMove?: boolean;
  select: (square: SquareModel | null) => void;
}

const Square = ({
  square,
  showCoordinateColumn,
  showCoordinateRow,
  isSelected,
  isValidMove,
  canSelect,
  select,
}: Props) => {
  const IconComponent = square.piece?.getIcon();
  const isWhite = square.piece?.getColor() === PlayerColor.WHITE;

  const backgroundColor = useMemo(() => {
    if (isSelected) return "bg-green-500";
    if (isValidMove) return "bg-blue-400";
    if (square.isLightSquare()) return "bg-gray-100";
    return "bg-amber-700";
  }, [isSelected, isValidMove, square]);

  const onClick = () => {
    if (canSelect || isValidMove) {
      select(isSelected ? null : square);
    }
  };

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center hover:cursor-pointer ${backgroundColor}`}
      onClick={onClick}>
      <span className={`absolute top-0 left-0 text-sm font-bold`}>
        {showCoordinateRow && square.getRowCoordinates()}
      </span>

      <span className={`absolute right-0 bottom-0 text-sm font-bold`}>
        {showCoordinateColumn && square.getColumnCoordinates()}
      </span>

      {square.piece && IconComponent && (
        <IconComponent
          className={`text-5xl ${
            isWhite
              ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              : "text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"
          }`}
        />
      )}

      {isValidMove && !square.piece && (
        <div className="h-4 w-4 rounded-full bg-blue-600 opacity-70" />
      )}

      {isValidMove && square.piece && (
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 opacity-70" />
      )}
    </div>
  );
};

export default Square;
