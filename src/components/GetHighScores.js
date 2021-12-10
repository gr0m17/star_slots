import { useEffect, useState, React } from "react";
import ScoreBoard from "./ScoreBoard";
import easyDB from "easydb-io";
import { getCookie } from "./HighScore";
const db = easyDB({
  database: "2648cddb-5633-4d8c-ad71-2bb8e13a66be",
  token: "60581ef8-ff21-4b2f-9fe1-cd14d9936f41",
});

function GetHighScores() {
  let deviceID = getCookie("deviceID");
  console.log(deviceID);
  if (deviceID == null) {
  }
  const [highScores, setHighScores] = useState([]);
  const [myScore, setMyScore] = useState(0);
  let myScoreIndex = 0;
  let myScoreTemp = 0;
  useEffect(
    (scores = highScores) => {
      async function fetchHighScores(highScores) {
        const response = await db.list();
        // console.log(response);
        const fetchedhighScores = await response;
        const result = Object.values(fetchedhighScores);
        const resultKey = Object.keys(fetchedhighScores);
        const resultsArray = result.map((key, index) => {
          console.log(key);
          if (resultKey[index] == deviceID) {
            myScoreIndex = index;
          }
          return key.bank;
        });
        myScoreTemp = resultsArray[myScoreIndex];
        let sortedScores = resultsArray.sort((a, b) => b - a);
        const timer1 = setTimeout(() => {
          setHighScores(sortedScores);
          setMyScore(myScoreTemp);
          console.log(myScore);
        }, 2000);
      }
      fetchHighScores(scores);
    },
    [highScores]
  );
  return <ScoreBoard scores={highScores} myScore={myScore} />;
}
export default GetHighScores;
