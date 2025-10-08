import { PlayerColor } from "../../models/PlayerModel";
import type SquareModel from "../../models/SquareModel";

interface Props {
  square: SquareModel;
}

const Square = ({ square }: Props) => {
  if (!square.piece) {
    return (
      <div className="relative flex h-full w-full items-center justify-center" />
    );
  }

  const IconComponent = square.piece.getIcon();
  const isWhite = square.piece.getColor() === PlayerColor.WHITE;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <IconComponent
        className={`text-5xl ${
          isWhite
            ? "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            : "text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"
        }`}
      />
    </div>
  );
};

export default Square;
