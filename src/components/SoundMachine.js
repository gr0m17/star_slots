import React from "react";
const ImportSoundMachine = () => {};

export const PlaySlotSound = () => {
  let songCounter = 0;

  let slotAudio = [
    new Audio("../sounds/reelsMusic001/reelSong_001.mp3"),
    new Audio("../sounds/reelsMusic001/reelSong_002.mp3"),
    new Audio("../sounds/reelsMusic001/reelSong_003.mp3"),
    new Audio("../sounds/reelsMusic001/reelSong_004.mp3"),
    new Audio("../sounds/reelsMusic001/reelSong_005.mp3"),
    new Audio("../sounds/reelsMusic001/reelSong_006.mp3"),
    new Audio("../sounds/reelsMusic001/reelSong_007.mp3"),
  ];
  slotAudio[songCounter].play();
  songCounter >= slotAudio.length ? (songCounter = 0) : songCounter++;
};
export const PlayWinSound = () => {
  let slotAudio = new Audio("../sounds/reels_win_001.mp3");
  slotAudio.play();
};
export default ImportSoundMachine;
