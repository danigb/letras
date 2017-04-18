import React, { Component } from "react";
import KeyboardHandler from "./KeyboardHandler";
import "./App.css";
import isEqual from "lodash.isequal";

const getLetterClass = (target, current) =>
  (target === current ? "MATCH" : current === undefined ? "PENDING" : "NONE");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.reduce(this.props.initialState);
  }

  dispatch(action) {
    this.setState(prevState => this.props.reduce(prevState, action));
  }
  addLetter = letter => this.dispatch({ type: "ADD_LETTER", letter });
  deleteLetter = () => this.dispatch({ type: "DELETE_LETTER" });
  newWord = length => this.dispatch({ type: "INIT", length });

  render() {
    const { state } = this;
    const canReset = isEqual(state.current, state.target);
    const selector = canReset
      ? state.availableLengths.map(len => (
          <a
            className="wordlength"
            key={len}
            href="#!"
            onClick={() => this.newWord(len)}
          >
            {len}
          </a>
        ))
      : "";
    const target = state.target.map((letter, i) => {
      const cls = getLetterClass(letter, this.state.current[i]);
      return <span key={i} className={cls}>{letter}</span>;
    });

    return (
      <div className="App">
        <KeyboardHandler
          onAddLetter={this.addLetter}
          onDeleteLetter={this.deleteLetter}
        />
        <div className="App-header">
          <div>
            <p>☲</p>
          </div>
        </div>
        <div className="App-playground">
          <div className="target">{target}</div>
          <div className="current">
            {this.state.current.map((letter, i) => {
              const cls = getLetterClass(letter, this.state.target[i]);
              return <span key={i} className={cls}>{letter}</span>;
            })}
          </div>
        </div>
        <div className="App-reset">
          {selector}
        </div>
      </div>
    );
  }
}

export default App;
