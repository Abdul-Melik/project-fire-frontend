import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import MainArea from "../components/Dashboard/MainArea";

type Props = {};

const Dashboard = (props: Props) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const buttonClickHandler = (button: string) => {
    setActiveButton(button);
  };
  return (
    <div className="flex">
      <Sidebar onButtonClick={buttonClickHandler} />
      <MainArea activeButton={activeButton} />
    </div>
  );
};

export default Dashboard;
