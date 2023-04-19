import React from "react";
import logo from "../../../public/svg/logotype.svg";
import arrow from "../../../public/svg/Vector.svg";
import clipboard from "../../../public/svg/clipboard.svg";
import profilePic from "../../../public/img/Image.png";
import home from "../../../public/svg/home.svg";
import employees from "../../../public/svg/employees.svg";
import coins from "../../../public/svg/coins.svg";
import document from "../../../public/svg/document.svg";
import invoice from "../../../public/svg/invoice.svg";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="fixed h-screen w-72 flex-col items-center border-r border-sidebarColor1 bg-gradient-to-t from-sidebarColor1 to-sidebarColor2">
      <img src={logo} className="ml-6 w-3/5 pt-8"></img>
      <div className="border-bordercolor mx-auto mt-10 flex h-20 w-11/12 items-center rounded-md border">
        <img className="h-9/12 ml-3" src={profilePic}></img>
        <div className="flex-col">
          <p className="mb-0 ml-4 font-Inter font-medium">Miron Lukač</p>
          <p className="font-Inter-light ml-4 text-sm">Admin</p>
        </div>
        <img src={arrow} className="ml-10 cursor-pointer"></img>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md bg-selectedColor">
        <img src={home} className="ml-3 h-5 w-5"></img>
        <p className="ml-3 font-GilroyBold text-sm">Home</p>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={clipboard} className="ml-3 h-5 w-5"></img>
        <p className="ml-3 font-Gilroy text-sm">Projects</p>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={employees} className="ml-3 h-5 w-5"></img>
        <p className="ml-3 font-Gilroy text-sm">Employees</p>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={coins} className="ml-3 h-5 w-5"></img>
        <p className="ml-3 font-Gilroy text-sm">Financial Overview</p>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={document} className="ml-3 h-5 w-5"></img>
        <p className="ml-3 font-Gilroy text-sm">Project Reporting</p>
      </div>
      <div className="mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md hover:bg-selectedColor">
        <img src={invoice} className="ml-3 h-5 w-5"></img>
        <p className="ml-3 font-Gilroy text-sm">Invoicing</p>
      </div>
    </div>
  );
};

export default Sidebar;
