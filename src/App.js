import React, { Component } from "react";
import KeyboardHandler from "./KeyboardHandler"
import "./App.css";

const reduce = (state, action = {}) => {
  const { type } = action
  switch (type) {
    case 'ADD_LETTER': 
      state.current.push(action.letter)
      return state
    case "DELETE_LETTER":
      state.current.pop()
      return state
    default:
      return state
  }
}

const initialState = {
  target: "HOLA",
  current: []
}

class App extends Component {
  state = reduce(initialState)

  dispatch (action) {
    this.setState(prevState => reduce(prevState, action))
  }
  addLetter = (letter) => this.dispatch({ type: "ADD_LETTER", letter })
  deleteLetter = () => this.dispatch({ type: "DELETE_LETTER" })

  render() {
    return (
      <div className="App">
        <KeyboardHandler onAddLetter={this.addLetter} onDeleteLetter={this.deleteLetter} />
        <div className="App-playground">
          <div className="target">
            {this.state.target}
          </div>
          <div className="current">
            {this.state.current.join('')}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
