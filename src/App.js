import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import cherry from "./images/Cherry.png";
import bakedFish from "./images/Baked_Fish.png";
import goldBar from "./images/Gold_Bar.png";
import Glacierfish from "./images/Glacierfish.png";
import Grape from "./images/Grape.png";
import Lionfish from "./images/Lionfish.png";
import Mutant_Carp from "./images/Mutant_Carp.png";
import Pineapple from "./images/Pineapple.png";
import Pink_Cake from "./images/Pink_Cake.png";
import Prehistoric_Tibia from "./images/Prehistoric_Tibia.png";
import Rainbow_Trout from "./images/Rainbow_Trout.png";
import Strawberry from "./images/Strawberry.png";
import Blank from "./images/Blank.png";
import { resolveGame, getRandomItem, evaluateWin } from "./utils/game";
import SlotRow from "./components/SlotRow";
import SpinAssigner from "./components/SpinAssigner";
import LinesBet_IMG from "./images/Lines_Bet.png";
import WINS_IMG from "./images/Wins.png";

const slotArray = [
  cherry,
  bakedFish,
  goldBar,
  Glacierfish,
  Grape,
  Lionfish,
  Mutant_Carp,
  Pineapple,
  Pink_Cake,
  Prehistoric_Tibia,
  Rainbow_Trout,
  Strawberry,
  Blank,
];
function App() {
  const [topDisplayRow, setTopDisplayRow] = useState([
    getRandomItem(slotArray),
    getRandomItem(slotArray),
    getRandomItem(slotArray),
  ]);
  const [displayArray, setDisplayArray] = useState([
    getRandomItem(slotArray),
    getRandomItem(slotArray),
    getRandomItem(slotArray),
  ]);
  const [bottomDisplayRow, setBottomDisplayRow] = useState([
    getRandomItem(slotArray),
    getRandomItem(slotArray),
    getRandomItem(slotArray),
  ]);
  const maxLines = 3;
  const [winAmount, setWinAmount] = useState(0);
  const winAmountRef = useRef(winAmount);
  winAmountRef.current = winAmount;
  const [topDisplayWin, setTopDisplayWin] = useState(false);
  const [displayArrayWin, setDisplayArrayWin] = useState(false);
  const [bottomDisplayWin, setBottomDisplayWin] = useState(false);
  const [wagerLines, setWagerLines] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const buttonsDisabledRef = useRef(buttonsDisabled);
  buttonsDisabledRef.current = buttonsDisabled;
  const wagerLinesRef = useRef(wagerLines);
  wagerLinesRef.current = wagerLines;
  const wagerHandler = () => {
    if (wagerLines < maxLines) {
      console.log(+wagerLines + 1);
      setWagerLines(+wagerLines + 1);
    }

    if (wagerLines === maxLines) {
      spinHandler();
    }
  };
  const maxWagerHandler = () => {
    console.log(maxLines);
    setWagerLines(maxLines);
    // const timerMax = setTimeout(() => {
    spinHandler();
    // }, 3000);
  };
  const spinHandler = () => {
    setButtonsDisabled(true);
    setWinAmount(0);
    const checkWager = (lines) => {
      if (wagerLinesRef.current >= lines) {
        setWinAmount(+winAmountRef.current + 1);
        return true;
      }
      return false;
    };
    console.log("spin!");
    setBottomDisplayWin(false);
    setTopDisplayWin(false);
    setDisplayArrayWin(false);
    const timer1 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);
      setTopDisplayRow(toDisplay);
      if (evaluateWin(toDisplay)) {
        if (checkWager(2)) {
          setTopDisplayWin(toDisplay);
        }
      }
    }, 1500);
    const timer2 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);

      setDisplayArray(toDisplay);
      if (evaluateWin(toDisplay)) {
        if (checkWager(1)) {
          setDisplayArrayWin(toDisplay);
        }
      }
    }, 2000);
    const timer3 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);
      setBottomDisplayRow(toDisplay);
      if (evaluateWin(toDisplay)) {
        if (checkWager(3)) {
          setBottomDisplayWin(toDisplay);
        }
      }
      console.log("wins:", winAmountRef.current);
      setWagerLines(0);
      setButtonsDisabled(false);
    }, 3000);

    setTopDisplayRow([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    setDisplayArray([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    setBottomDisplayRow([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    return () => clearTimeout(timer1, timer2, timer3);
  };

  return (
    <div className="app">
      <SlotRow
        array={topDisplayRow}
        winParam={topDisplayWin}
        playLine={wagerLines > 1 ? true : false}
      />

      <SlotRow
        array={displayArray}
        winParam={displayArrayWin}
        playLine={wagerLines > 0 ? true : false}
      />
      <SlotRow
        array={bottomDisplayRow}
        winParam={bottomDisplayWin}
        playLine={wagerLines > 2 ? true : false}
      />
      <div>
        <img src={LinesBet_IMG} alt="logo" />{" "}
        <input className="lines-bet" value={wagerLines}></input>
        <img src={WINS_IMG} alt="logo" />{" "}
        <input className="lines-bet" value={winAmount}></input>
      </div>
      <div>
        <button
          className="wager-one-button"
          onClick={wagerHandler}
          disabled={buttonsDisabledRef.current}
        >
          BET ONE
        </button>
        <button
          className="wager-max-button"
          onClick={maxWagerHandler}
          disabled={buttonsDisabledRef.current}
        >
          BET MAX!
        </button>
        <button
          className="spin-button"
          onClick={spinHandler}
          disabled={
            buttonsDisabledRef.current || wagerLines <= 0 ? true : false
          }
        >
          Spin the reels!
        </button>
      </div>
    </div>
  );
}

export default App;
