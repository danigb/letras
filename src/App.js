import React, { Component } from "react";
import KeyboardHandler from "./KeyboardHandler";
import "./App.css";

const getLetterClass = (target, current) => 
  target === current ? 'MATCH' :
  current === undefined ? 'PENDING' :
  'NONE'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.reduce(this.props.initialState);
  }

  dispatch(action) {
    this.setState(prevState => this.props.reduce(prevState, action));
  }
  addLetter = letter => this.dispatch({ type: "ADD_LETTER", letter });
  deleteLetter = () => this.dispatch({ type: "DELETE_LETTER" });
  newWord = () => this.dispatch({ type: "INIT" })

  render() {
    return (
      <div className="App">
        <KeyboardHandler
          onAddLetter={this.addLetter}
          onDeleteLetter={this.deleteLetter}
        />
        <div className="App-header">
          <a href="#!" onClick={this.newWord}>palabras</a>
        </div>
        <div className="App-playground">
          <div className="target">
            {this.state.target.map((letter, i) => {
              const cls = getLetterClass(letter, this.state.current[i])
              return (<span key={i} className={cls}>{letter}</span>)
            })}
          </div>
          <div className="current">
            {this.state.current.join("")}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
