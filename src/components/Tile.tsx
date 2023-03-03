import React, { useState } from "react";
import "../styles/tile.css";
import "../styles/transitions.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Card from "./Card";

interface TileProps {
  animals: string[];
  colors: string[];
  id: string;
  transitions: string[];
  typingSpeed: number[];
}

interface CardState {
  animal: string;
  animalIndex: number;
  color: string;
  colorIndex: number;
  id: string;
  transition: string;
  speed: number;
}

const Tile: React.FC<TileProps> = ({
  animals,
  colors,
  id,
  transitions,
  typingSpeed,
}: TileProps) => {
  const [card, setCard] = useState<CardState>(() => {
    const currAnimalIndex = Math.floor(Math.random() * animals.length);
    const currAnimal = animals[currAnimalIndex];

    const currColorIndex = Math.floor(Math.random() * colors.length);
    const currColor = colors[currColorIndex];

    const currId = `${id} ${currAnimal}`;
    const currentSpeed =
      typingSpeed[Math.floor(Math.random() * typingSpeed.length)];

    const currTransition =
      transitions[Math.floor(Math.random() * transitions.length)];

    return {
      animal: currAnimal,
      animalIndex: currAnimalIndex,
      color: currColor,
      colorIndex: currColorIndex,
      id: currId,
      transition: currTransition,
      speed: currentSpeed,
    };
  });

  const nextCard = () => {
    let nextAnimalIndex = Math.floor(Math.random() * animals.length);

    if (nextAnimalIndex === card.animalIndex && nextAnimalIndex !== 0) {
      nextAnimalIndex = nextAnimalIndex - 1;
    } else if (nextAnimalIndex === 0) {
      nextAnimalIndex = nextAnimalIndex + 2;
    }

    const nextAnimal = animals[nextAnimalIndex];

    const nextColorIndex = Math.floor(Math.random() * colors.length);
    const nextColor = colors[nextColorIndex];

    const nextId = `${id} ${nextAnimal}`;

    const nextTransition =
      transitions[Math.floor(Math.random() * transitions.length)];
    const nextSpeed =
      typingSpeed[Math.floor(Math.random() * typingSpeed.length)];

    const nextCardState: CardState = {
      animal: nextAnimal,
      animalIndex: nextAnimalIndex,
      color: nextColor,
      colorIndex: nextColorIndex,
      id: nextId,
      transition: nextTransition,
      speed: nextSpeed,
    };

    setCard(nextCardState);
  };

  return (
    <TransitionGroup component="div" id={card.id} className="tile">
      <CSSTransition
        in={true}
        key={card.id}
        timeout={500}
        classNames={card.transition}
        unmountOnExit={true}
        mountOnEnter={true}
      >
        <Card
          animal={card.animal}
          color={card.color}
          speed={card.speed}
          nextCard={nextCard}
        />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Tile;
