import { PlayerColor } from "../../models/PlayerModel";
import type SquareModel from "../../models/SquareModel";

interface Props {
  square: SquareModel;
  showCoordinateRow: boolean;
  showCoordinateColumn: boolean;
}

const Square = ({ square, showCoordinateColumn, showCoordinateRow }: Props) => {
  const IconComponent = square.piece?.getIcon();
  const isWhite = square.piece?.getColor() === PlayerColor.WHITE;

  return (
    <div className="relative flex h-full w-full items-center justify-center hover:cursor-pointer">
      <span className={`absolute top-0 left-0 text-sm font-bold`}>
        {showCoordinateRow && square.getRowCoordinates()}
      </span>

      <span className={`absolute right-0 bottom-0 text-sm font-bold`}>
        {showCoordinateColumn && square.getColumnCoordinates()}
      </span>

      {square.piece && (
        <IconComponent
          className={`text-5xl ${
            isWhite
              ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              : "text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"
          }`}
        />
      )}
    </div>
  );
};

export default Square;
