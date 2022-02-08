import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./AddWordModal.scss";
import { LETTER_COUNT, Tile } from "./Game";
import { GameKeyboard } from "./GameKeyboard";
import { GameKeyboardInput } from "./GameKeyboardInput";

interface Props {
  show: boolean;
  onSubmit: (tileList: Tile[]) => void;
  onClose: () => void;
}

const AddWordModal = (props: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [tileList, setTileList] = useState<Tile[]>([]);

  useEffect(() => {
    if (props.show) {
      setIndex(0);
      setTileList(
        Array(LETTER_COUNT)
          .fill(0)
          .map((_, i) => ({
            index: i,
            letter: "",
            check: ""
          }))
      );
    }
  }, [props.show]);

  const onClickKeyboard = (letter: string) => {
    console.log("onClickKeyboard", letter);
    if (index < LETTER_COUNT) {
      setTileList(
        tileList.map(tile =>
          tile.index === index ? { ...tile, letter, check: "o" } : tile
        )
      );
      setIndex(index + 1);
    }
  };

  const onClickEnter = () => {
    if (index === LETTER_COUNT) {
      props.onSubmit(tileList);
      props.onClose();
    }
  };

  const onClickBack = () => {
    if (0 < index) {
      setTileList(
        tileList.map(tile =>
          tile.index === index - 1 ? { ...tile, letter: "", check: "" } : tile
        )
      );
      setIndex(index - 1);
    }
  };

  const onClickTile = (tileIndex: number) => {
    if (tileIndex < index) {
      setTileList(
        tileList.map(tile =>
          tile.index === tileIndex
            ? {
                ...tile,
                check: tile.check === "o" ? "s" : tile.check === "s" ? "b" : "o"
              }
            : tile
        )
      );
    }
  };

  const isKo = () => {
    return navigator.language.includes("ko");
  };

  return (
    <Modal className="add-word-modal" show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Word</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {isKo()
            ? "글자 입력 후, 타일을 클릭하거나, 숫자키(1~5)를 눌러 타일의 색을 변경할수 있습니다."
            : "After entering the letter, you can change the color of the tile by clicking on the tile or pressing the number key (1-5)."}
        </p>
        <div className="word mb-3">
          {tileList.map(tile => (
            <div
              key={tile.index}
              className={classNames("tile", { [tile.check]: tile.letter })}
              onClick={() => onClickTile(tile.index)}
            >
              {tile.letter}
            </div>
          ))}
        </div>

        <GameKeyboard
          index={index}
          onClickKeyboard={onClickKeyboard}
          onClickEner={onClickEnter}
          onClickBack={onClickBack}
        />
      </Modal.Body>
      <GameKeyboardInput
        index={index}
        onClickKeyboard={onClickKeyboard}
        onClickEner={onClickEnter}
        onClickBack={onClickBack}
        onClickTile={onClickTile}
      />
    </Modal>
  );
};

export { AddWordModal };
