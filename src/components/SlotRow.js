import "./SlotRow.css";
import Arrow from "../images/arrow.png";
import Arrow_Empty from "../images/arrow_empty.png";
import Win_Indicator from "../images/win_indicator.png";
const SlotRow = (props) => {
  return (
    <div
      style={
        props.winParam
          ? { backgroundColor: "#ED4245" }
          : { backgroundColor: "#ffffff" }
      }
    >
      <img
        className="arrow-icon"
        src={props.playLine ? Arrow : Arrow_Empty}
        alt="logo"
      />

      {props.array.map((image) => {
        return (
          <img
            key={Math.random()}
            src={image}
            alt="logo"
            className="slot-icon"
          />
        );
      })}
      <img src={Win_Indicator} className="win-icon" alt="logo" />
    </div>
  );
};

export default SlotRow;
