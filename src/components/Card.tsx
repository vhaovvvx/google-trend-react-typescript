import { useState, useEffect } from "react";

interface CardProps {
  animal: string;
  color: string;
  nextCard: () => void;
  speed: number;
}

const Card = ({ animal, color, nextCard, speed }: CardProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setText((prevText) => animal.substring(0, prevText.length + 1));
    }, speed);

    if (text === animal) {
      setTimeout(nextCard, 2500);
      return;
    }
  }, [animal, nextCard, speed, text]);

  return (
    <div className="card" style={{ background: color }}>
      <a
        className="typing fade-in"
        target="_blank"
        href="https://youtu.be/dQw4w9WgXcQ?t=42"
        rel="noopener noreferrer"
      >
        <span>{text}</span>
        <span id="cursor"></span>
      </a>
    </div>
  );
};

export default Card;
