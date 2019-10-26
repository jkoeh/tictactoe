import React, { Component } from "react";
import Square from "./square";
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
  renderSquare(i) {
    let winningSquare = this.getWinningSquares(this.props.squares);
    let highLighted = winningSquare && winningSquare.includes(i);
    return (
      <Square
        key={i}
        highLighted={highLighted}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  renderBoardRow(i) {
    let squares = [];
    for (let j = 0 + i * 3; j < i * 3 + 3; j++) {
      squares.push(this.renderSquare(j));
    }
    return (
      <div key={i} className="board-row">
        {squares}
      </div>
    );
  }
  render() {
    let boards = [];
    for (let i = 0; i < 3; i++) {
      boards.push(this.renderBoardRow(i));
    }
    return <div>{boards}</div>;
  }
}
export default Board;
