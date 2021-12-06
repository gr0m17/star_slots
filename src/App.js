import "./App.css";
import React, { useEffect, useState } from "react";
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
  const [topDisplayWin, setTopDisplayWin] = useState(false);
  const [displayArrayWin, setDisplayArrayWin] = useState(false);
  const [bottomDisplayWin, setBottomDisplayWin] = useState(false);
  const [wagerLines, setWagerLines] = useState(0);
  const updateWinnings = (winAmount) => {
    setWagerLines(0);
    console.log("winnings:", winAmount);
  };
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
    let winAmount = 0;
    const checkWager = (lines) => {
      if (wagerLines >= lines) {
        winAmount = +winAmount + 1;
        console.log("line win:", lines);
      }
    };
    console.log("spin!");
    setBottomDisplayWin(false);
    setTopDisplayWin(false);
    setDisplayArrayWin(false);
    const timer1 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 100);
      setTopDisplayWin(evaluateWin(toDisplay));
      setTopDisplayRow(toDisplay);
      if (evaluateWin(toDisplay)) {
        checkWager(2);
      }
    }, 1500);
    const timer2 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 100);
      setDisplayArrayWin(evaluateWin(toDisplay));
      setDisplayArray(toDisplay);
      if (evaluateWin(toDisplay)) {
        checkWager(1);
      }
    }, 2000);
    const timer3 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 100);
      setBottomDisplayWin(evaluateWin(toDisplay));
      setBottomDisplayRow(toDisplay);
      if (evaluateWin(toDisplay)) {
        checkWager(3);
      }
      updateWinnings(winAmount);
    }, 3000);

    setTopDisplayRow([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    setDisplayArray([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    setBottomDisplayRow([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    return () => clearTimeout(timer1, timer2, timer3);
  };

  return (
    <div className="app">
      <SlotRow array={topDisplayRow} winParam={topDisplayWin} />
      <SlotRow array={displayArray} winParam={displayArrayWin} />
      <SlotRow array={bottomDisplayRow} winParam={bottomDisplayWin} />
      <div>
        <button className="wager-one-button" onClick={wagerHandler}>
          BET ONE
        </button>
        <button className="wager-max-button" onClick={maxWagerHandler}>
          BET MAX!
        </button>
        <button className="spin-button" onClick={spinHandler}>
          Spin the reels!
        </button>
      </div>
    </div>
  );
}

export default App;
