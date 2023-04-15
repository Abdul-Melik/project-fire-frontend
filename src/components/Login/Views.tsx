import React from "react";
import LeftScreen from "../leftscreen";
import RightScreen from "../rightscreen";

function App() {
  return (
    <div className="flex h-screen">
      <LeftScreen />
      <RightScreen />
    </div>
  );
}

export default App;