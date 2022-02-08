import classNames from "classnames";
import _ from "lodash";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AddWordModal } from "./AddWordModal";
import "./Game.scss";
import { allWordList } from "./wordList";

export interface Tile {
  index: number;
  letter: string;
  check: string;
}

export const LETTER_COUNT = 5;
const ROW_COUNT = 6;

const Game = () => {
  const [wordList, setWordList] = useState<Tile[][]>([]);
  const [recommendWordList, setRecommendWordList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onSubmit = (tileList: Tile[]) => {
    const newWordList = [...wordList];
    newWordList.push(tileList);
    setWordList(newWordList);
  };

  const onClickTile = (rowIndex: number, tileIndex: number) => {
    const newWordList = _.cloneDeep(wordList);
    const check = newWordList[rowIndex][tileIndex].check;
    newWordList[rowIndex][tileIndex].check =
      check === "o" ? "s" : check === "s" ? "b" : "o";
    setWordList(newWordList);
  };

  const search = () => {
    const rWordList = allWordList
      .map(word => word.toUpperCase())
      .filter(word =>
        wordList.every(row => {
          const letterList = word.split("");

          const oList = Array.from(
            new Set(
              row.filter(tile => tile.check === "o").map(tile => tile.letter)
            )
          );

          const bTileList = row.filter(tile => tile.check === "b");

          const sTileList = row.filter(tile => tile.check === "s");

          // s 체크
          if (sTileList.some(tile => tile.letter !== letterList[tile.index])) {
            return false;
          }

          // b 체크
          if (0 < bTileList.length) {
            // b 인 글자가 있어야 된다
            if (
              letterList.every(
                letter => !bTileList.map(tile => tile.letter).includes(letter)
              )
            ) {
              return false;
            }

            // b 인 글자가 해당 자리에 있으면 x
            if (
              bTileList.some(tile => tile.letter === letterList[tile.index])
            ) {
              return false;
            }
          }

          // o 체크
          if (
            oList.some(oLetter => {
              const countInWord = letterList.filter(
                letter => letter === oLetter
              ).length;
              const countSB = row.filter(
                tile =>
                  tile.letter === oLetter && ["s", "b"].includes(tile.check)
              ).length;

              return countSB < countInWord;
            })
          ) {
            return false;
          }

          return true;
        })
      );

    setRecommendWordList([...rWordList]);
  };

  return (
    <div className="game">
      <h1 className="mt-2 mb-4">WORDLE HINT</h1>

      {/* word */}
      {wordList.map((word, rowIndex) => (
        <div key={rowIndex} className="word">
          {word.map(tile => (
            <div
              key={`${rowIndex}_${tile.index}`}
              className={classNames("tile", { [tile.check]: tile.letter })}
              onClick={() => onClickTile(rowIndex, tile.index)}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}

      {/* add word */}
      {wordList.length < ROW_COUNT && (
        <div className="d-grid mt-4">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(true)}
          >
            +
          </Button>
        </div>
      )}

      <div className="d-grid mt-4">
        <Button variant="outline-primary" onClick={search}>
          SEARCH
        </Button>
      </div>

      {/* recommend word */}
      {0 < recommendWordList.length && (
        <p className="mt-4 mb-1">
          {recommendWordList.length}개의 단어가 있습니다.
        </p>
      )}
      <div className="recommend ">
        {recommendWordList.map(word => (
          <div key={word} className="recommend-word">
            {word}
          </div>
        ))}
      </div>

      <AddWordModal
        show={showModal}
        onSubmit={onSubmit}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export { Game };
