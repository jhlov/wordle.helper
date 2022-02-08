import React, { useEffect, useRef } from "react";
import { LETTER_COUNT } from "./Game";

interface Props {
  index: number;
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
  onClickTile: (tileIndex: number) => void;
}

const GameKeyboardInput = (props: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInterval(() => {
      if (divRef.current) {
        divRef.current.focus();
      }
    }, 100);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      if (props.index === LETTER_COUNT) {
        props.onClickEner();
      }
    } else if (e.code === "Backspace") {
      if (0 < props.index) {
        props.onClickBack();
      }
    } else if (e.code === "Digit1") {
      props.onClickTile(0);
    } else if (e.code === "Digit2") {
      props.onClickTile(1);
    } else if (e.code === "Digit3") {
      props.onClickTile(2);
    } else if (e.code === "Digit4") {
      props.onClickTile(3);
    } else if (e.code === "Digit5") {
      props.onClickTile(4);
    } else {
      const code: { [key: string]: string } = {
        KeyQ: "Q",
        KeyW: "W",
        KeyE: "E",
        KeyR: "R",
        KeyT: "T",
        KeyY: "Y",
        KeyU: "U",
        KeyI: "I",
        KeyO: "O",
        KeyP: "P",
        KeyA: "A",
        KeyS: "S",
        KeyD: "D",
        KeyF: "F",
        KeyG: "G",
        KeyH: "H",
        KeyJ: "J",
        KeyK: "K",
        KeyL: "L",
        KeyZ: "Z",
        KeyX: "X",
        KeyC: "C",
        KeyV: "V",
        KeyB: "B",
        KeyN: "N",
        KeyM: "M"
      };

      if (code[e.code]) {
        props.onClickKeyboard(code[e.code]);
      }
    }
  };

  return (
    <div
      className="position-absolute"
      ref={divRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    ></div>
  );
};

export { GameKeyboardInput };
