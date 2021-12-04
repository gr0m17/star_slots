import "./SlotRow.css";

const SlotRow = (props) => {
  return (
    <div
      style={
        props.winParam
          ? { backgroundColor: "#ED4245" }
          : { backgroundColor: "#ffffff" }
      }
    >
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
    </div>
  );
};

export default SlotRow;
