import React from "react";
import styles from "../styles/moves.module.css";

function getXYCoordinate(i) {
  if (i <= 2) return { x: 1, y: i + 1 };
  else if (i <= 5) return { x: 2, y: i - 2 };
  else return { x: 3, y: i - 5 };
}
const Moves = props => {
  let moveList = props.history.map((step, move) => {
    const { x, y } = getXYCoordinate(step.coordinate);
    let currentMove = props.stepNumber === move ? styles.currentMove : {};
    const desc = move
      ? `Go to move # ${move} (x: ${x}, y:${y})`
      : "Go to game start";
    return (
      <li
        onClick={() => props.onClick(move)}
        className={styles.move}
        key={move}
      >
        <div className={currentMove}>{desc}</div>
      </li>
    );
  });
  return <ul className={styles.moveList}>{moveList}</ul>;
};
export default Moves;
