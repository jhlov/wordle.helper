import classNames from "classnames";
import React, { useEffect } from "react";
import "./App.scss";
import { Game } from "./Game";

function App() {
  const isMobile = true;

  useEffect(() => {
    if (!navigator.language.includes("ko")) {
      document.documentElement.lang = "en";
    }
  }, []);

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <Game />
      </div>
    </div>
  );
}

export default App;
