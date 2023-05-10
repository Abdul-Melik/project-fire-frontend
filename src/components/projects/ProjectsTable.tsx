import React, { useCallback, useContext, useEffect, useState } from "react";
import search from "../../assets/svg/search.svg";
import axios from "axios";
import AuthContext from "src/shared/context/auth-context";
import avatarImg from "../../assets/img/avatar.png";
import Avatars from "./Avatars";
import { TIMEOUT } from "dns";
import { avatar } from "src/assets";

type Props = {
  data: Project[];
};
enum ProjectType {
  Fixed = "fixed",
  OnGoing = "on-going",
}

enum SalesChannel {
  Online = "online",
  InPerson = "in-person",
  Referral = "referral",
  Other = "other",
}

interface Project {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  actualEndDate: Date;
  projectType: ProjectType;
  projectStatus: string;
  hourlyRate: number;
  projectValueBAM: number;
  salesChannel: SalesChannel;
  finished: boolean;
  employees: [
    {
      employee: {
        _id: string;
      };
    }
  ];
}
interface user {
  id: string;
  image: string;
}

const ProjectsTable = ({ data }: Props) => {
  //get all the users from the db using axios
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<user[]>([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [usersData, setUsersData] = useState<any>([]);
  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users`, {
        headers: { Authorization: "Bearer " + token },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  }, [token]);
  //get the users on mount
  useEffect(() => {
    const getUsersData = async () => {
      const data = await getUsers();
      if (data.length > 0) {
        setUsersData(data);
      }
    };
    getUsersData();
  }, [getUsers]);

  //if the employee id in data matches the id in users, return the image. the input will be an array of employees
  const getImages = (employees: any) => {
    if (usersData.length > 0) {
      const images: any = [];
      for (let i = 0; i < employees.length; i++) {
        for (let j = 0; j < usersData.length; j++) {
          if (
            employees[i].employee &&
            employees[i].employee._id &&
            usersData[j].employee &&
            usersData[j].employee._id &&
            employees[i].employee._id === usersData[j].employee._id
          ) {
            images.push(usersData[j].image);
            break;
          }
          if (j === usersData.length - 1) {
            images.push(avatarImg);
          }
        }
      }
      console.log(images);
      return images;
    } else setTimeout(getImages, 1000);
  };

  //get the dates from the project
  const getDates = (project: Project) => {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const actualEndDate = new Date(project.actualEndDate);
    const startDateString = startDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
    const endDateString = endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
    const actualEndDateString = actualEndDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
    return { startDateString, endDateString, actualEndDateString };
  };
  const getColor = (project: string) => {
    if (project === "active") {
      return "bg-[#32C653]";
    } else if (project === "on-hold") {
      return "bg-[#FFB341]";
    } else return "bg-[#CECECE]";
  };

  const statusOrder: any = {
    active: 1,
    "on-hold": 2,
    inactive: 3,
    completed: 4,
  };

  const sortedProjects = data.sort((a, b) => {
    const statusA = a.projectStatus.toLowerCase();
    const statusB = b.projectStatus.toLowerCase();
    return statusOrder[statusA] - statusOrder[statusB];
  });

  return (
    <div className="w-[1050px] rounded-md border border-ashen-grey">
      <div className="flex items-center">
        <h2 className="px-4 py-[23px] font-gilroy-medium text-lg">
          Projects Table
        </h2>
        <div className="flex h-[30px] items-center bg-[#F5FFFA]">
          <h2 className="px-4 text-center font-gilroy-medium text-sm text-moss-green">
            {data.length} total
          </h2>
        </div>
        <div className="relative ml-auto w-4/12">
          <input
            className="font-gilroy h-10 w-[315px] rounded-sm border border-ashen-grey pl-[46px] text-[#57585F]"
            placeholder="Search"
          />
          <img
            src={search}
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"
            alt="search-icon"
          />
        </div>
      </div>
      <table className="w-full border-t border-ashen-grey">
        <thead className="font-gilroy-medium text-sm text-[#6C6D75]">
          <tr className="h-[40px] text-left">
            <th className="w-[150px] pl-4">Name</th>
            <th className="w-[150px] pl-4">Description</th>
            <th className="w-[150px] pl-4">Duration (from-to)</th>
            <th className="w-[150px] pl-5">Developers</th>
            <th className="w-[150px] pl-4">Hourly rate</th>
            <th className="w-[150px] pl-4">Project value in BAM</th>
            <th className="w-[150px] pl-9">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="h-[60px] w-[157px] border-t border-ashen-grey text-left font-gilroy-regular text-sm text-[#6C6D75]"
            >
              <td className="w-[150px] pl-4">{item.name}</td>
              <td className="w-[150px] pl-4">
                {item.description.slice(0, 15)}...
              </td>
              <td className="w-[150px] pl-4">
                {getDates(item).startDateString} -{" "}
                {getDates(item).endDateString}
              </td>
              <td className="w-[150px] pl-5">
                <Avatars images={getImages(item.employees)} />
              </td>
              <td className="w-[150px] pl-4">${item.hourlyRate}</td>
              <td className="w-[150px] pl-4">{item.projectValueBAM} KM</td>
              <td className="flex w-[150px] pl-9 pt-[19px]">
                {" "}
                <div
                  className={`mb-auto mr-2 mt-auto h-[6px] w-[6px] rounded-full ${getColor(
                    item.projectStatus
                  )}`}
                ></div>
                {item.projectStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
