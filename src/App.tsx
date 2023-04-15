import { useState } from "react";
import Navbar from "./components/Navbar";
import LeftScreen from "./components/leftscreen";
import RightScreen from "./components/rightscreen";

function App() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <LeftScreen />
      </div>
      <div className="w-1/2">
        <RightScreen />
      </div> 
    </div> 
  );
}
export default App;
