import React, { useState } from "react";
import "./styles/main.css";

import Animals from "./data/animal_names.json";
import Colors from "./data/colors.json";
import Transitions from "./data/transitions.json";
import TypingSpeed from "./data/typingSpeed.json";

import Tile from "./components/Tile";
import Logo from "./components/Logo";
import GridChooser from "./components/GridChooser";
import uuid from "react-uuid";
// import Logo from './Logo';
// import GridChooser from './GridChooser';
// import Tile from './Tile';
// import Animals from './Animals';
// import Colors from './Colors';
// import Transitions from './Transitions';
// import TypingSpeed from './TypingSpeed';

interface Props {}

interface State {
  colors: string[];
  animals: string[];
  typingSpeed: number[];
  rows: string;
  columns: string;
  transitions: string[];
}

const App: React.FC<Props> = () => {
  const [state, setState] = useState<State>({
    colors: [],
    animals: [],
    typingSpeed: [],
    rows: "",
    columns: "",
    transitions: [],
  });

  React.useEffect(() => {
    setState({
      animals: Animals,
      colors: Colors,
      transitions: Transitions,
      typingSpeed: TypingSpeed,
      rows: "5",
      columns: "5",
    });
  }, []);

  const setGrid = (dimensions: number[]) => {
    setState({
      ...state,
      rows: dimensions[0].toString(),
      columns: dimensions[1].toString(),
    });
  };

  const renderGrid = () => {
    const { colors, animals, rows, columns, transitions, typingSpeed } = state;
    const grid = {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateRows: `repeat(${rows}, calc(100vh / ${rows}))`,
    };
    const row = {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, calc(100vw / ${columns}))`,
    };

    let i = 0;
    let tiles: JSX.Element[][] = [];
    while (i < parseInt(rows)) {
      let j = 0;
      let row: JSX.Element[] = [];
      while (j < parseInt(columns)) {
        let id = i + "-" + j;
        row.push(
          <Tile
            id={id}
            key={uuid()}
            animals={animals}
            transitions={transitions}
            colors={colors}
            typingSpeed={typingSpeed}
          />
        );
        j++;
      }
      tiles.push(row);
      i++;
    }

    return (
      <div className="grid" style={grid}>
        {tiles.map((rowArr, index) => {
          return (
            <div key={index} className="row" style={row}>
              {rowArr}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <GridChooser setGrid={setGrid} />
      <Logo />
      {renderGrid()}
    </main>
  );
};

export default App;
