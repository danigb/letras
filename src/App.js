import React, { Component } from "react";
import KeyboardHandler from "./KeyboardHandler";
import "./App.css";

const getLetterClass = (target, current) =>
  (target === current ? "MATCH" : current === undefined ? "PENDING" : "NONE");

const Selector = ({ lengths, onSelect, current }) => {
  const handleClick = len => e => {
    e.preventDefault();
    onSelect(len);
  };
  const all = lengths.map(len => {
    const cn = +len === current ? "active" : "";
    return <a key={len} className={cn} onClick={handleClick(len)}>{len}</a>;
  });
  return <div className="Selector">{all}</div>;
};

const Letters = ({ current, target, className }) => (
  <div className={className + " Letters"}>
    {current.map((letter, i) => (
      <span key={i} className={getLetterClass(letter, target[i])}>
        {letter}
      </span>
    ))}
  </div>
);

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

    return (
      <div className="App">
        <KeyboardHandler
          onAddLetter={this.addLetter}
          onDeleteLetter={this.deleteLetter}
        />
        <Selector
          lengths={this.state.availableLengths}
          onSelect={this.newWord}
          current={this.state.target.length}
        />
        <Letters
          className="target"
          current={state.target}
          target={state.current}
        />
        <Letters
          className="current"
          current={state.current}
          target={state.target}
        />
      </div>
    );
  }
}

export default App;
