import PieceModel, { PieceType } from "./PieceModel";
import { PlayerColor } from "./PlayerModel";
import SquareModel from "./SquareModel";

export default class BoardModel {
  squares: SquareModel[] = [];

  constructor() {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        this.squares.push(new SquareModel(row, column));
      }
    }
    this.initializePieces();
  }

  private initializePieces() {
    // Define the piece order for the back row
    const backRowPieces = [
      PieceType.ROOK,
      PieceType.KNIGHT,
      PieceType.BISHOP,
      PieceType.QUEEN,
      PieceType.KING,
      PieceType.BISHOP,
      PieceType.KNIGHT,
      PieceType.ROOK,
    ];

    // White Pieces
    for (let column = 0; column < 8; column++) {
      this.setPieceAt(
        0,
        column,
        new PieceModel(backRowPieces[column], PlayerColor.WHITE)
      );
      this.setPieceAt(
        1,
        column,
        new PieceModel(PieceType.PAWN, PlayerColor.WHITE)
      );
    }

    // Black pieces
    for (let column = 0; column < 8; column++) {
      this.setPieceAt(
        7,
        column,
        new PieceModel(backRowPieces[column], PlayerColor.BLACK)
      );

      this.setPieceAt(
        6,
        column,
        new PieceModel(PieceType.PAWN, PlayerColor.BLACK)
      );
    }
  }

  private setPieceAt(row: number, column: number, piece: PieceModel) {
    const square = this.squares.find(
      (s) => s.row === row && s.column === column
    );
    if (square) {
      square.setPiece(piece);
    }
  }
}
