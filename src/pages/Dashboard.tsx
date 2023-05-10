import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import MainArea from "../components/Dashboard/MainArea";
import Modal from "../shared/components/Modal";

type Props = {};

const Dashboard = (props: Props) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const buttonClickHandler = (button: string) => {
    setActiveButton(button);
  };

  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <Modal
        onCancel={() => setError(null)}
        header="Error!"
        show={!!error}
        isError={!!error}
      >
        <p>{error}</p>
      </Modal>
      <div className="flex">
        <Sidebar
          onButtonClick={buttonClickHandler}
          handleError={(error) => setError(error)}
        />
        <MainArea activeButton={activeButton} />
      </div>
    </>
  );
};

export default Dashboard;
