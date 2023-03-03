import uuid from "react-uuid";
import React, { useState } from "react";
import Square from "./Square";

type GridChooserProps = {
  setGrid: (dims: number[]) => void;
};

const GridChooser: React.FC<GridChooserProps> = ({ setGrid }) => {
  const [hover, setHover] = useState(false);

  const renderSquares = () => {
    let i = 0;
    const squaresArray: React.ReactNode[] = [];
    while (i < 5) {
      let j = 0;
      let row: React.ReactNode[] = [];
      while (j < 5) {
        let dim: number[] = [i + 1, j + 1];
        row.push(<Square key={uuid()} setGrid={setGrid} dim={dim} />);
        j++;
      }
      squaresArray.push(row);
      i++;
    }
    const squares = [].concat.apply([], squaresArray as any);
    return <div className="gridChooser">{squares}</div>;
  };

  const handleEnter = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  const style = {
    width: hover ? 120 : 30,
    height: hover ? 120 : 30,
  };

  return (
    <div
      className="squareContainer"
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {renderSquares()}
    </div>
  );
};

export default GridChooser;
