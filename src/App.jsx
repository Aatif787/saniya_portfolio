import React from "react";
import Routes from "./Routes";
import UnderwaterScene from "./components/UnderwaterScene";

function App() {
  return (
    <div className="relative">
      <UnderwaterScene />
      <div className="relative glass-content" style={{ zIndex: 1 }}>
        <Routes />
      </div>
    </div>
  );
}

export default App;
