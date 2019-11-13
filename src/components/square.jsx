import React from "react";
import styles from "../styles/square.module.css";
const Square = props => {
  let shouldHighLight = props.highLighted
    ? { textShadow: "2px 2px 3px #fff" }
    : {};
  return (
    <button
      style={{
        ...shouldHighLight,
        ...getBorderStyle(props.index)
      }}
      className={styles.square}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
};
function getBorderStyle(index) {
  let borderStyle = {
    border: "3px solid #fff"
  };

  if (index % 3 === 0) {
    borderStyle.borderLeft = "hidden";
  }
  if (index < 3) {
    borderStyle.borderTop = "hidden";
    borderStyle.borderBottom = "hidden";
  }
  if ([2, 5, 8].includes(index)) borderStyle.borderRight = "hidden";
  if (index > 5) borderStyle.borderBottom = "hidden";

  if (index === 0) borderStyle.borderTopRightRadius = "15px 255px";

  if (index === 2) borderStyle.borderBottom = "hidden";
  if (index === 3) {
    // borderStyle.borderBottom = "4px solid";
    borderStyle.borderTopLeftRadius = "255px 15px";
    borderStyle.borderBottomLeftRadius = "255px 15px";
  }
  if (index === 4) {
  }

  if (index === 5) {
    borderStyle.borderTopRightRadius = " 255px 15px";
    borderStyle.borderBottom = "hidden";
  }
  if (index === 6) {
    borderStyle.borderTop = "hidden";
    borderStyle.borderRight = "hidden";
  }
  if (index === 7) {
    borderStyle.borderTop = "hidden";
    borderStyle.marginLeft = "-4px";
    borderStyle.borderRight = "hidden";
    borderStyle.borderLeft = "5px solid";
    borderStyle.borderBottomLeftRadius = "15px 255px";
  }

  if (index === 8) {
    borderStyle.marginTop = "-3px";
    borderStyle.borderLeft = "5px solid";
    // borderStyle.borderTop = "4px solid";
    borderStyle.borderTopRightRadius = "255px 15px";
    borderStyle.borderBottomLeftRadius = "15px 255px";
  }
  return borderStyle;
}

export default Square;
