import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  let style = props.highLighted ? { backgroundColor: "yellow" } : {};
  return (
    <button style={style} className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
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

class Game extends React.Component {
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
