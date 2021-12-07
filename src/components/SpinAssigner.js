import React, { useEffect } from "react";
import spin1 from "../images/spin_001.gif";
import spin2 from "../images/spin_002.gif";
import spin3 from "../images/spin_003.gif";
import spin4 from "../images/spin_004.gif";
import spin5 from "../images/spin_005.gif";
import spin6 from "../images/spin_006.gif";
import spin7 from "../images/spin_007.gif";
import spin8 from "../images/spin_008.gif";
import spin9 from "../images/spin_009.gif";
const spinArray = [
  spin1,
  spin2,
  spin3,
  spin4,
  spin5,
  spin6,
  spin7,
  spin8,
  spin9,
];
export function SpinAssigner() {
  const randomIndex = Math.floor(Math.random() * spinArray.length);
  return spinArray[randomIndex];
}

export function PreloadSpinners() {
  useEffect(() => {
    //preloading image
    spinArray.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);
}

export default SpinAssigner;
