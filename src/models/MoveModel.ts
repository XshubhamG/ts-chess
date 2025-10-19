import type SquareModel from "./SquareModel";

export default class MoveModel {
  readonly from: SquareModel;
  readonly to: SquareModel;
  readonly isCapture: boolean;
  readonly isCastling: boolean;
  readonly isEnPassant: boolean;

  constructor(
    from: SquareModel,
    to: SquareModel,
    isCapture: boolean = false,
    isCastling: boolean = false,
    isEnPassant: boolean = false
  ) {
    this.from = from;
    this.to = to;
    this.isCapture = isCapture;
    this.isCastling = isCastling;
    this.isEnPassant = isEnPassant;
  }
}
