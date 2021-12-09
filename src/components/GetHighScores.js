import { useEffect, useState, React } from "react";

import easyDB from "easydb-io";

const db = easyDB({
  database: "2648cddb-5633-4d8c-ad71-2bb8e13a66be",
  token: "60581ef8-ff21-4b2f-9fe1-cd14d9936f41",
});

function GetHighScores(updates) {
  const [highScores, setHighScores] = useState([]);
  if (updates) {
    console.log(updates);
    //   setHighScores(updates);
  }
  useEffect(() => {
    async function fetchHighScores() {
      const response = await db.list();
      console.log(response);
      const fetchedhighScores = await response;
      const result = Object.values(fetchedhighScores);
      const resultsArray = result.map((key) => {
        return key.bank;
      });
      console.log(resultsArray);
      setHighScores(resultsArray.sort((a, b) => b - a));
    }
    fetchHighScores();
  }, []);
  return (
    <div>
      <h2>
        Current Scoreboard: <br />
        (refresh to update)
      </h2>
      {highScores.map((score) => (
        <div>{score}</div>
      ))}
    </div>
  );
}
export default GetHighScores;
