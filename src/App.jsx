import React from "react";
import Routes from "./Routes";
import OceanBackground from "./components/OceanBackground";

function App() {
  return (
    <div className="relative">
      <OceanBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Routes />
      </div>
    </div>
  );
}

export default App;
