import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import EditableButtonGroup from "./EditableButtonGroup";
function App() {
  return (
    <div className="assign">
      <EditableButtonGroup />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
