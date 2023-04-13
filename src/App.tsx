import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <h1 className="v-full text-primary flex bg-red-400">Hello</h1>
    </div>
  );
}

export default App;
