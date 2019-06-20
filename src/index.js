import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import SimpleUndo from './SimpleUndo'
import AdvancedUndo from './AdvancedUndo'


function App() {
  return <div><SimpleUndo />
    <AdvancedUndo /></div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
