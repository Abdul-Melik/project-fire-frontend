import { useState } from "react";
import Navbar from "./components/Navbar";
import LeftScreen from "./components/Login/leftscreen";
import Login from "./components/Login/login";

function App() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <LeftScreen />
      </div>
      <div className="w-1/2">
        <Login />
      </div> 
    </div> 
  );
}
export default App;
