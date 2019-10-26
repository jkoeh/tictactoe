import React from "react";
const Square = props => {
  let style = props.highLighted ? { backgroundColor: "yellow" } : {};
  return (
    <button style={style} className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

export default Square;
