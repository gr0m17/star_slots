const ScoreBoard = (props) => {
  // console.log(props);
  return (
    <div className="score-board">
      <h2>
        Leaderboard <br />
      </h2>
      <ol>
        {props.scores.map((score, index) => (
          <li key={index} className={score === props.myScore ? "myScore" : ""}>
            {score}
            {score === props.myScore ? " (you)" : ""}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ScoreBoard;
