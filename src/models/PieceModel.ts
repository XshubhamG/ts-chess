import { PlayerColor } from "./PlayerModel";

export enum PieceType {
    KING = "KING",
    QUEEN = "QUEEN",
    BISHOP = "BISHOP",
    KNIGHT = "KNIGHT",
    ROOK = "ROOK",
    PAWN = "PAWN"
}

export default class PieceModel {
    private readonly type: PieceType;
    private readonly color: PlayerColor;

    constructor(type: PieceType, color: PlayerColor) {
        this.type = type;
        this.color = color;
    }
}