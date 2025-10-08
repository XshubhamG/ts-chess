import type { ComponentType } from "react";
import {
  GiChessBishop,
  GiChessKing,
  GiChessKnight,
  GiChessPawn,
  GiChessQueen,
  GiChessRook,
} from "react-icons/gi";
import { PlayerColor } from "./PlayerModel";

export enum PieceType {
  KING = "KING",
  QUEEN = "QUEEN",
  BISHOP = "BISHOP",
  KNIGHT = "KNIGHT",
  ROOK = "ROOK",
  PAWN = "PAWN",
}

export default class PieceModel {
  private readonly type: PieceType;
  private readonly color: PlayerColor;

  constructor(type: PieceType, color: PlayerColor) {
    this.type = type;
    this.color = color;
  }

  getType(): PieceType {
    return this.type;
  }

  getColor(): PlayerColor {
    return this.color;
  }

  getIcon(): ComponentType<{ className?: string }> {
    const icons = {
      [PieceType.KING]: GiChessKing,
      [PieceType.QUEEN]: GiChessQueen,
      [PieceType.ROOK]: GiChessRook,
      [PieceType.BISHOP]: GiChessBishop,
      [PieceType.KNIGHT]: GiChessKnight,
      [PieceType.PAWN]: GiChessPawn,
    };
    return icons[this.type];
  }
}
