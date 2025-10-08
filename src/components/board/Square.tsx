import type SquareModel from '../../models/SquareModel';
import { getSquareCoordinates } from '../../services/square-service';

interface Props {
  square: SquareModel;
}

const Square = ({ square }: Props) => {
  return <div>{getSquareCoordinates(square)}</div>;
};

export default Square;
