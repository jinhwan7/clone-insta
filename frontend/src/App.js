import React from "react";
import Router from "./shared/Router";
import "./style/reset.css";
import "./style/style.css";
import Modal from "react-modal";

function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

Modal.setAppElement("#root");

export default App;
