import React, { Component } from "react";
import Board from "./board";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), coordinate: null }],
      currentMark: "X",
      stepNumber: 0,
      asc: true,
      winner: null
    };
  }
  calculateWinner(squares) {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[b] &&
        squares[c] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  handleClick(i) {
    const { history, stepNumber } = this.state;
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = newHistory[stepNumber].squares;
    if (currentSquares[i] || this.calculateWinner(currentSquares)) return;
    let newState = { ...currentSquares };
    newState[i] = this.state.currentMark;
    this.setState({
      history: newHistory.concat([{ squares: newState, coordinate: i }]),
      currentMark: this.state.currentMark === "X" ? "O" : "X",
      stepNumber: stepNumber + 1
    });
  }
  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      currentMark: stepNumber % 2 === 0 ? "X" : "O"
    });
  }
  getXYCoordinate(i) {
    if (i <= 2) return { x: 1, y: i + 1 };
    else if (i <= 5) return { x: 2, y: i - 2 };
    else return { x: 3, y: i - 5 };
  }
  sortMove() {
    let asc = this.state.asc ? false : true;
    this.setState({ asc });
  }
  render() {
    const { history, stepNumber } = this.state;
    const currentSquares = history[stepNumber].squares;
    const winner = this.calculateWinner(currentSquares);
    const draw = winner === null && stepNumber >= 9;

    const status = winner
      ? `Winner is ${winner}`
      : draw
      ? "Draw, restart?"
      : `Next player: ${this.state.currentMark}`;

    let moves = history.map((step, move) => {
      const { x, y } = this.getXYCoordinate(step.coordinate);
      let currentMove = stepNumber === move ? { fontWeight: "bold" } : {};
      const desc = move
        ? `Go to move # ${move} (x: ${x}, y:${y})`
        : "Go to game start";
      return (
        <li key={move}>
          <button style={currentMove} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortMove()}>sort</button>
          <ol>{this.state.asc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}
export default Game;
