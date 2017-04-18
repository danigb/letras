import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import pickRandom from "pick-random"
import "./index.css";
import words4 from "../data/words-4.json"

const reduce = (state, action = {}) => {
  const { type } = action;
  switch (type) {
    case "INIT":
      const target = pickRandom(words4)[0].toUpperCase().split('')
      const current = []
      return { target, current }
    case "ADD_LETTER":
      state.current.push(action.letter);
      return state;
    case "DELETE_LETTER":
      state.current.pop();
      return state;
    default:
      return state;
  }
};

const initialState = reduce({}, { type: "INIT" });


ReactDOM.render(
  <App reduce={reduce} initialState={initialState} />, 
  document.getElementById("root")
);
