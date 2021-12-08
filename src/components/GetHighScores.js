import { React } from "react";

import easyDB from "easydb-io";

const db = easyDB({
  database: "2648cddb-5633-4d8c-ad71-2bb8e13a66be",
  token: "60581ef8-ff21-4b2f-9fe1-cd14d9936f41",
});

const GetHighScores = (props) => {
  console.log(props.scores);
  return (
    <div className="scores">
      high scores:
      <div>{props.scores[0]}1</div>
    </div>
  );
};

export async function fetchHighScores() {
  let values;
  values = await db.list();
  const highScores = Object.entries(values).flat();
  console.log(highScores);
  return highScores;
}
export default GetHighScores;
// };
// function GetHighScores() {
//   let values = fetchHighScores();
//   console.log(values);
//   const highscores = values;
//   // }
//   return (
//     <div>
//       <h1>High scores:</h1>
//       <h2>1){values[0]}</h2>
//     </div>
//   );
// }
// const updateHighscore = async (bankValue, deviceID) => {
//     let value, values;
//     value = await db.put(deviceID, { bank: bankValue });
//     //   value = await db.get("myKey");
//     //   value = await db.delete("myKey");
//     values = await db.list();
//     console.log(values);
