import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import React from "react";
import { LETTER_COUNT } from "./Game";
import "./GameKeyboard.scss";

interface Props {
  index: number;
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
}

const GameKeyboard = (props: Props) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="game-keyboard">
      <div className="game-keyboard-row">
        {row1.map(letter => (
          <div
            key={letter}
            className="item"
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row px-2">
        {row2.map(letter => (
          <div
            key={letter}
            className="item"
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row">
        <button
          className="item enter"
          onClick={props.onClickEner}
          disabled={props.index < LETTER_COUNT}
        >
          ENTER
        </button>
        {row3.map(letter => (
          <div
            key={letter}
            className="item"
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
        <button className="item" onClick={props.onClickBack}>
          <BackspaceOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export { GameKeyboard };
