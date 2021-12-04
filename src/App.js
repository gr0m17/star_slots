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

  const [topDisplayWin, setTopDisplayWin] = useState(false);
  const [displayArrayWin, setDisplayArrayWin] = useState(false);
  const [bottomDisplayWin, setBottomDisplayWin] = useState(false);

  const spinHandler = () => {
    console.log("spin!");
    setBottomDisplayWin(false);
    setTopDisplayWin(false);
    setDisplayArrayWin(false);
    const timer1 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);
      setTopDisplayWin(evaluateWin(toDisplay));
      setTopDisplayRow(toDisplay);
    }, 1500);
    const timer2 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);
      setDisplayArray(toDisplay);
      setDisplayArrayWin(evaluateWin(toDisplay));
    }, 2000);
    const timer3 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);
      setBottomDisplayWin(evaluateWin(toDisplay));
      setBottomDisplayRow(toDisplay);
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
      <button className="spin-button" onClick={spinHandler}>
        Spin the reels!
      </button>
    </div>
  );
}

export default App;
