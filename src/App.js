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
import { SpinAssigner, PreloadSpinners } from "./components/SpinAssigner";
import LinesBet_IMG from "./images/Lines_Bet.png";
import WINS_IMG from "./images/Wins.png";
import Bank_IMG from "./images/Bank.png";
import StarSlotsLogo_IMG from "./images/StarSlotsLogo.png";
import DisplayPayout from "./components/DisplayPayouts";
import { setBank, checkBank } from "./components/HighScore";
import GetHighScores from "./components/GetHighScores";
import { payoutTable, slotArray } from "./components/payoutTable";
import slotAudio001 from "./sounds/reel_song/reelSong_001.mp3";
import slotAudio002 from "./sounds/reel_song/reelSong_002.mp3";
import slotAudio003 from "./sounds/reel_song/reelSong_003.mp3";
import slotAudio004 from "./sounds/reel_song/reelSong_004.mp3";
import slotAudio005 from "./sounds/reel_song/reelSong_005.mp3";
import slotAudio006 from "./sounds/reel_song/reelSong_006.mp3";
import slotAudio007 from "./sounds/reel_song/reelSong_007.mp3";
import MutedIcon from "./images/volume-mute-solid.svg";
import VolumeIcon from "./images/volume-up-solid.svg";
import winSound from "./sounds/reels_win_001.mp3";
import { getCookie, setCookie } from "./utils/storage";
const slotAudio = [
  slotAudio001,
  slotAudio002,
  slotAudio003,
  slotAudio004,
  slotAudio005,
  slotAudio006,
  slotAudio007,
];
const payoutTableLookup = {
  cherry: 2,
  bakedFish: 3,
  goldBar: 5,
  Strawberry: 5,
  Glacierfish: 10,
  Grape: 10,
  Lionfish: 10,
  Mutant_Carp: 25,
  Pineapple: 50,
  Pink_Cake: 50,
  Prehistoric_Tibia: 75,
  Rainbow_Trout: 100,
  // Blank: 1,
};
let songCounter = 0;
const payoutTableNames = [
  "cherry",
  "bakedFish",
  "goldBar",
  "Strawberry",
  "Glacierfish",
  "Grape",
  "Lionfish",
  "Mutant_Carp",
  "Pineapple",
  "Pink_Cake",
  "Prehistoric_Tibia",
  "Rainbow_Trout",
  // "Blank",
];

const slotArrayDisplay = [
  cherry,
  bakedFish,
  goldBar,
  Glacierfish,
  Strawberry,
  Grape,
  Lionfish,
  Mutant_Carp,
  Pineapple,
  Pink_Cake,
  Prehistoric_Tibia,
  Rainbow_Trout,
  // Blank,
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
  const [bankAmount, setBankAmount] = useState(null);
  const bankAmountRef = useRef(bankAmount);
  const [muted, setMuted] = useState(0);
  const [highScores, setHighScores] = useState(0);
  bankAmountRef.current = bankAmount;
  const buttonsDisabledRef = useRef(buttonsDisabled);
  buttonsDisabledRef.current = buttonsDisabled;
  const wagerLinesRef = useRef(wagerLines);
  wagerLinesRef.current = wagerLines;
  //
  //
  //
  PreloadSpinners();
  if (bankAmount === null) {
    setBankAmount(checkBank());
  }
  //
  useEffect(() => {
    const cookieMuted = getCookie("muted");
    if (+cookieMuted === 1) {
      setMuted(1);
    }
  }, []);

  function muteHandler() {
    console.log("muteHandler");
    console.log("muted:", muted);
    if (muted === 0) {
      setMuted(1);
      setCookie("muted", 1, 365);
    } else {
      setMuted(0);
      setCookie("muted", 0, 365);
    }
  }
  //
  //

  const wagerHandler = () => {
    if (wagerLines < maxLines) {
      console.log(+wagerLines + 1);
      setWagerLines(+wagerLines + 1);
    }

    if (wagerLines === maxLines) {
      spinHandler(wagerLines);
    }
  };
  const maxWagerHandler = () => {
    console.log(maxLines);
    setWagerLines(maxLines);
    // const timerMax = setTimeout(() => {
    spinHandler(maxLines);
    // }, 3000);
  };
  const spinHandler = (input) => {
    PlaySlotSound();

    console.log(
      "bankAmount:",
      bankAmount,
      "wagerLinesRef.current:",
      wagerLinesRef.current
    );
    let betLines = wagerLinesRef.current;
    if (input > 0) {
      betLines = input;
    }
    if (betLines < 1) betLines = wagerLines;
    setBank(bankAmount - betLines);
    setBankAmount(bankAmount - betLines);
    setButtonsDisabled(true);
    setWinAmount(0);
    const payWins = () => {
      if (winAmountRef.current > 0) {
        PlayWinSound();
      }
      setBank(winAmountRef.current + bankAmountRef.current);
      setBankAmount(winAmountRef.current + bankAmountRef.current);
      return winAmountRef.current + bankAmount;
    };
    const checkWager = (lines, toDisplay) => {
      if (wagerLinesRef.current >= lines) {
        const prizeMultiplier = slotArray.findIndex(
          (element) => element === toDisplay[0]
        );
        setWinAmount(+winAmountRef.current + payoutTable[prizeMultiplier]);
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
        if (checkWager(2, toDisplay)) {
          setTopDisplayWin(toDisplay);
        }
      }
    }, 1800);
    const timer2 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);

      setDisplayArray(toDisplay);
      if (evaluateWin(toDisplay)) {
        if (checkWager(1, toDisplay)) {
          setDisplayArrayWin(toDisplay);
        }
      }
    }, 2000);
    const timer3 = setTimeout(() => {
      const toDisplay = resolveGame(slotArray, 10);
      setBottomDisplayRow(toDisplay);
      if (evaluateWin(toDisplay)) {
        if (checkWager(3, toDisplay)) {
          setBottomDisplayWin(toDisplay);
        }
      }
      console.log("wins:", winAmountRef.current);
      setWagerLines(0);
      setButtonsDisabled(false);
      payWins();
    }, 2700);

    // function slotSounds() {
    //   let slotAudio = new Audio(SlotSound);
    //   slotAudio.play();
    // }
    // function winSounds() {

    // }

    //

    //
    function PlaySlotSound() {
      if (muted === 1) return;
      let PlaySlotAudio = new Audio(slotAudio[songCounter]);
      PlaySlotAudio.play();
      console.log("songCounter:", songCounter);
      console.log(slotAudio);
      songCounter >= slotAudio.length - 1
        ? (songCounter = 0)
        : (songCounter = +songCounter + 1);
    }
    function PlayWinSound() {
      let winSounds = new Audio(winSound);
      if (muted === 1) {
        winSounds.volume = 0.05;
      } else {
        winSounds.volume = 1;
      }
      winSounds.play();
    }
    //

    //
    setTopDisplayRow([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    setDisplayArray([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    setBottomDisplayRow([SpinAssigner(), SpinAssigner(), SpinAssigner()]);
    return () => clearTimeout(timer1, timer2, timer3);
  };
  return (
    <div className="content">
      <div className="slot-game">
        <div className="titleBox">
          <img src={StarSlotsLogo_IMG} alt="logo" />
        </div>
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
        <div className="Information">
          <img src={LinesBet_IMG} alt="logo" />{" "}
          <input className="lines-bet" value={wagerLines}></input>
          <img src={WINS_IMG} alt="logo" />{" "}
          <input className="lines-payout" value={winAmount}></input>
          <img src={Bank_IMG} alt="logo" />{" "}
          <input className="lines-payout" value={bankAmount}></input>
        </div>
        <div className="Buttons">
          <button
            className="wager-one-button button"
            onClick={wagerHandler}
            disabled={buttonsDisabledRef.current}
          >
            BET ONE
          </button>
          <button
            className="wager-max-button button"
            onClick={maxWagerHandler}
            disabled={buttonsDisabledRef.current}
          >
            BET MAX!
          </button>
          <button
            className="spin-button button"
            onClick={spinHandler}
            disabled={
              buttonsDisabledRef.current || wagerLines <= 0 ? true : false
            }
          >
            Spin the reels!
          </button>
          <button className="muted-button" onClick={muteHandler}>
            <img src={muted ? MutedIcon : VolumeIcon} />
          </button>
        </div>
      </div>
      <div className="information-panel">
        <GetHighScores />
        <DisplayPayout
          slotArray={slotArrayDisplay}
          payoutTable={Object.values(payoutTableLookup)}
        />
      </div>
    </div>
  );
}

export default App;
