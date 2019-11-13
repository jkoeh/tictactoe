import React from "react";
import styles from "../styles/winningLine.module.css";

function calculateRenderingPosition(winningSquare) {
  let winnerString = JSON.stringify(winningSquare);
  if (winnerString === JSON.stringify([0, 1, 2])) {
    return { x1: "5%", x2: "95%", y1: "15%", y2: "15%" };
  }
  if (winnerString === JSON.stringify([0, 3, 6])) {
    return { x1: "15%", x2: "16%", y1: "5%", y2: "95%" };
  }
  if (winnerString === JSON.stringify([0, 4, 8])) {
    return { x1: "5%", x2: "95%", y1: "5%", y2: "95%" };
  }
  if (winnerString === JSON.stringify([1, 4, 7])) {
    return { x1: "50%", x2: "50%", y1: "5%", y2: "95%" };
  }
  if (winnerString === JSON.stringify([2, 5, 8])) {
    return { x1: "84%", x2: "84%", y1: "5%", y2: "95%" };
  }
  if (winnerString === JSON.stringify([2, 4, 6])) {
    return { x1: "95%", x2: "5%", y1: "5%", y2: "95%" };
  }
  if (winnerString === JSON.stringify([3, 4, 5])) {
    return { x1: "5%", x2: "95%", y1: "50%", y2: "50%" };
  }
  if (winnerString === JSON.stringify([6, 7, 8])) {
    return { x1: "5%", x2: "95%", y1: "83%", y2: "83%" };
  }
}

const WinningLine = props => {
  let { winningSquare } = props;
  var { x1, x2, y1, y2 } = calculateRenderingPosition(winningSquare);
  return (
    <div className={styles.svgContainer}>
      <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
        <line
          stroke="#FFF"
          strokeWidth="3px"
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
        ></line>
      </svg>
    </div>
  );
};

export default WinningLine;
