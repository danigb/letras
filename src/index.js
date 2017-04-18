import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import words from "../data/words.json";

const availableLengths = Object.keys(words).filter(l => l <= 12);

const pick = length => {
  const arr = words[length];
  const ndx = Math.floor(Math.random() * arr.length);
  return arr[ndx];
};

const reduce = (state, action = {}) => {
  const { type } = action;
  switch (type) {
    case "INIT":
      const len = action.length || 5;
      const target = pick(len).toUpperCase().split("");
      const current = [];
      return { target, current, availableLengths };
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
