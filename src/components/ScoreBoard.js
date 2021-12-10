const ScoreBoard = (props) => {
  console.log(props);
  return (
    <div>
      <h2>
        Current Scoreboard: <br />
      </h2>
      {props.scores.map((score, index) => (
        <div key={index}>
          {score}
          {score === props.myScore ? " < this is you" : ""}
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
