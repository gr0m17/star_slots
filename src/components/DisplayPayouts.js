import React from "react";

const DisplayPayout = (props) => {
  return (
    <div className="payout-table">
      {/* <h1>Payout Table:</h1> */}
      {props.slotArray.map((element, index) => {
        return (
          <div>
            <img src={props.slotArray[index]} />
            <img src={props.slotArray[index]} />
            <img src={props.slotArray[index]} />{" "}
            {props.payoutTable[index] + "x"}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPayout;

//   props.slotArray.map((element, index) => {
//     return (
//       <div>
//         <img src={element} />
//         <img src={element} />
//         <img src={element} />: {props.payoutTable[index]}
//       </div>
//     );
//   });
