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

  getSquareAt(row: number, column: number): SquareModel | null {
    return (
      this.squares.find((s) => s.row === row && s.column === column) || null
    );
  }

  isValidPosition(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  getValidMoves(square: SquareModel): SquareModel[] {
    if (!square.piece) return [];

    const moves: SquareModel[] = [];
    const piece = square.piece;

    switch (piece.type) {
      case PieceType.PAWN:
        moves.push(...this.getPawnMoves(square));
        break;
      case PieceType.ROOK:
        moves.push(...this.getRookMoves(square));
        break;
      case PieceType.BISHOP:
        moves.push(...this.getBishopMoves(square));
        break;
      case PieceType.QUEEN:
        moves.push(...this.getQueenMoves(square));
        break;
      case PieceType.KING:
        moves.push(...this.getKingMoves(square));
        break;
      case PieceType.KNIGHT:
        moves.push(...this.getKnightMoves(square));
        break;
    }

    return moves;
  }

  private getPawnMoves(square: SquareModel): SquareModel[] {
    const moves: SquareModel[] = [];
    const piece = square.piece;
    const direction = piece?.color === PlayerColor.WHITE ? 1 : -1;
    const startRow = piece?.color === PlayerColor.WHITE ? 1 : 6;

    // Forward move
    const oneForward = this.getSquareAt(square.row + direction, square.column);
    if (oneForward && !oneForward.piece) {
      moves.push(oneForward);

      // Two squares forward from starting position
      if (square.row === startRow) {
        const twoForward = this.getSquareAt(
          square.row + 2 * direction,
          square.column
        );
        if (twoForward && !twoForward.piece) {
          moves.push(twoForward);
        }
      }
    }

    // Diagonal captures
    const captureLeft = this.getSquareAt(
      square.row + direction,
      square.column - 1
    );
    if (
      captureLeft &&
      captureLeft.piece &&
      captureLeft.piece.color !== piece?.color
    ) {
      moves.push(captureLeft);
    }

    const captureRight = this.getSquareAt(
      square.row + direction,
      square.column + 1
    );
    if (
      captureRight &&
      captureRight.piece &&
      captureRight.piece.color !== piece?.color
    ) {
      moves.push(captureRight);
    }

    return moves;
  }

  private getRookMoves(square: SquareModel): SquareModel[] {
    const moves: SquareModel[] = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]; // right, left, down, up

    for (const [rowDir, colDir] of directions) {
      for (let i = 1; i < 8; i++) {
        const newRow = square.row + i * rowDir;
        const newCol = square.column + i * colDir;

        if (!this.isValidPosition(newRow, newCol)) break;

        const targetSquare = this.getSquareAt(newRow, newCol);
        if (!targetSquare) break;

        if (!targetSquare.piece) {
          moves.push(targetSquare);
        } else {
          if (targetSquare.piece.color !== square.piece?.color) {
            moves.push(targetSquare);
          }
          break;
        }
      }
    }

    return moves;
  }

  private getBishopMoves(square: SquareModel): SquareModel[] {
    const moves: SquareModel[] = [];
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]; // diagonals

    for (const [rowDir, colDir] of directions) {
      for (let i = 1; i < 8; i++) {
        const newRow = square.row + i * rowDir;
        const newCol = square.column + i * colDir;

        if (!this.isValidPosition(newRow, newCol)) break;

        const targetSquare = this.getSquareAt(newRow, newCol);
        if (!targetSquare) break;

        if (!targetSquare.piece) {
          moves.push(targetSquare);
        } else {
          if (targetSquare.piece.color !== square.piece?.color) {
            moves.push(targetSquare);
          }
          break;
        }
      }
    }

    return moves;
  }

  private getQueenMoves(square: SquareModel): SquareModel[] {
    return [...this.getRookMoves(square), ...this.getBishopMoves(square)];
  }

  private getKingMoves(square: SquareModel): SquareModel[] {
    const moves: SquareModel[] = [];
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [rowDir, colDir] of directions) {
      const newRow = square.row + rowDir;
      const newCol = square.column + colDir;

      if (!this.isValidPosition(newRow, newCol)) continue;

      const targetSquare = this.getSquareAt(newRow, newCol);
      if (!targetSquare) continue;

      if (
        !targetSquare.piece ||
        targetSquare.piece.color !== square.piece?.color
      ) {
        moves.push(targetSquare);
      }
    }

    return moves;
  }

  private getKnightMoves(square: SquareModel): SquareModel[] {
    const moves: SquareModel[] = [];
    const knightMoves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (const [rowDir, colDir] of knightMoves) {
      const newRow = square.row + rowDir;
      const newCol = square.column + colDir;

      if (!this.isValidPosition(newRow, newCol)) continue;

      const targetSquare = this.getSquareAt(newRow, newCol);
      if (!targetSquare) continue;

      if (
        !targetSquare.piece ||
        targetSquare.piece.color !== square.piece?.color
      ) {
        moves.push(targetSquare);
      }
    }

    return moves;
  }

  setBoard(board: BoardModel) {
    this.squares = board.squares;
  }

  movePiece(from: SquareModel, to: SquareModel) {
    if (!from.piece) return;

    to.setPiece(from.piece);
    from.setPiece(null);
  }
}
