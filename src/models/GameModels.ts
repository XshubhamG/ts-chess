import type BoardModel from "./BoardModel";
import type { PlayerColor } from "./PlayerModel";

export interface GameState {
  board: BoardModel;
  currentPlayer: PlayerColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  canCastleKingside: {
    [PlayerColor.WHITE]: boolean;
    [PlayerColor.BLACK]: boolean;
  };
  canCastleQueenside: {
    [PlayerColor.WHITE]: boolean;
    [PlayerColor.BLACK]: boolean;
  };
  enPassantTarget: { row: number; column: number } | null;
  moveCount: number;
}
