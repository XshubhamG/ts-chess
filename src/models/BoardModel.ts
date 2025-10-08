import SquareModel from "./SquareModel";

export default class BoardModel {
    squares: SquareModel[] = [];

    constructor() {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                this.squares.push(new SquareModel(row, column));
            }
        }
    }
}