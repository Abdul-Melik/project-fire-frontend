import React, { useContext, useEffect, useState } from "react";
import logo from "../../../public/svg/logotype.svg";
import arrow from "../../../public/svg/Vector.svg";
import clipboard from "../../../public/svg/clipboard.svg";
import profilePic from "../../../public/img/Image.png";
import home from "../../../public/svg/home.svg";
import employees from "../../../public/svg/employees.svg";
import coins from "../../../public/svg/coins.svg";
import document from "../../../public/svg/document.svg";
import invoice from "../../../public/svg/invoice.svg";
import useHttpClient from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";

type Props = {
  onButtonClick: (button: string) => void;
};

const Sidebar = ({ onButtonClick }: Props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const buttonClickHandler = (button: string) => {
    onButtonClick(button);
  };
  const [userInfo, setUserInfo] = useState<any>([]);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          "https://project-fire.onrender.com/api/users/" + auth.userId,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setUserInfo(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
    console.log(userInfo);
  }, [sendRequest, auth.token]);

  return (
    <div className="h-screen w-72 flex-col items-center border-r border-sidebarColor1 bg-gradient-to-t from-sidebarColor1 to-sidebarColor2">
      <img src={logo} className="ml-6 w-3/5 pt-8"></img>
      <div className="border-bordercolor mx-auto mt-10 flex h-20 w-11/12 items-center rounded-md border">
        <img
          className="ml-3 h-14 w-14 rounded-lg object-cover"
          src={userInfo.image}
        ></img>
        <div className="flex-col">
          <p className="mb-0 ml-4 font-Inter font-medium">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
          <p className="font-Inter-light ml-4 text-sm">Admin</p>
        </div>
        <img src={arrow} className="absolute ml-56 cursor-pointer pl-2"></img>
      </div>
      <div
        className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md bg-selectedColor"
        onClick={() => buttonClickHandler("Home")}
      >
        <img src={home} className="ml-3 h-5 w-5"></img>
        <button className="ml-3 font-GilroyBold text-sm">Home</button>
      </div>
      <div
        className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor"
        onClick={() => buttonClickHandler("Projects")}
      >
        <img src={clipboard} className="ml-3 h-5 w-5"></img>
        <button className="ml-3 font-Gilroy text-sm">Projects</button>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={employees} className="ml-3 h-5 w-5"></img>
        <button
          className="ml-3 font-Gilroy text-sm"
          onClick={() => buttonClickHandler("Employees")}
        >
          Employees
        </button>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={coins} className="ml-3 h-5 w-5"></img>
        <button
          className="ml-3 font-Gilroy text-sm"
          onClick={() => buttonClickHandler("Finance")}
        >
          Financial Overview
        </button>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={document} className="ml-3 h-5 w-5"></img>
        <button
          className="ml-3 font-Gilroy text-sm"
          onClick={() => buttonClickHandler("Reporting")}
        >
          Project Reporting
        </button>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={invoice} className="ml-3 h-5 w-5"></img>
        <button
          className="ml-3 font-Gilroy text-sm"
          onClick={() => buttonClickHandler("Invoicing")}
        >
          Invoicing
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
