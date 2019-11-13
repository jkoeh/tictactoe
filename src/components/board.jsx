import React, { Component } from "react";
import Square from "./square";
import styles from "../styles/board.module.css";

import WinningLine from "./winningLine";
class Board extends Component {
  getWinningSquares(squares) {
    const lines = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]
    ];
    let answer;
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[b] &&
        squares[c] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        answer = [a, b, c];
      }
    }
    return answer;
  }
  renderSquare(i, highLighted) {
    return (
      <Square
        key={i}
        index={i}
        highLighted={highLighted}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderBoardRow(i) {
    let winningSquare = this.getWinningSquares(this.props.squares);
    let squares = [];
    for (let j = 0 + i * 3; j < i * 3 + 3; j++) {
      let highLighted = winningSquare && winningSquare.includes(j);
      squares.push(this.renderSquare(j, highLighted));
    }
    return (
      <div style={{ position: "relative" }} key={i} className="board-row">
        {squares}
      </div>
    );
  }
  render() {
    let winningSquare = this.getWinningSquares(this.props.squares);
    let boardRows = [];
    for (let i = 0; i < 3; i++) {
      boardRows.push(this.renderBoardRow(i));
    }
    return (
      <div style={{ position: "relative" }} className={styles.board}>
        <div style={{ position: "absolute", width: "297px", height: "100%" }}>
          {winningSquare ? <WinningLine winningSquare={winningSquare} /> : ""}
        </div>
        {boardRows}
      </div>
    );
  }
}
export default Board;
