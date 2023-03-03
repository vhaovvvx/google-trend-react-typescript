import React from "react";

interface Props {
  setGrid: (dim: number[]) => void;
  dim: number[];
}

const Square: React.FC<Props> = ({ setGrid, dim }) => (
  <div
    className="square"
    title={`${dim[0]}x${dim[1]}`}
    onClick={() => setGrid(dim)}
  ></div>
);

export default Square;
