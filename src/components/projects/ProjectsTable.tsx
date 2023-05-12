import React, { useCallback, useContext, useEffect, useState } from "react";
import search from "../../assets/svg/search.svg";
import axios from "axios";
import AuthContext from "src/shared/context/auth-context";
import avatarImg from "../../assets/img/avatar.png";
import Avatars from "./Avatars";
import { TIMEOUT } from "dns";
import { avatar } from "src/assets";
import TableHead from "src/shared/components/table-elements/TableHead";
import TableRow from "src/shared/components/table-elements/TableRow";

type Props = {
  data: Project[];
  activePage: any;
};

interface Project {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  actualEndDate: Date;
  projectStatus: string;
  hourlyRate: number;
  projectValueBAM: number;
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

const ProjectsTable = ({ data, activePage }: Props) => {
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
    }
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

  // Search Bar & Active/Inactive on Click
  const [searchTerm, setSearchTerm] = useState("");
  let filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activePage === 2) {
    filteredData = data.filter((item) => item.projectStatus === "active");
  } else if (activePage === 3) {
    filteredData = data.filter((item) => item.projectStatus === "inactive");
  } else if (activePage === 4) {
    filteredData = data.filter((item) => item.projectStatus === "completed");
  }

  if (searchTerm) {
    filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const columns: string[] = [
    "Name",
    "Description",
    "Duration (from-to)",
    "Developers",
    "Hourly rate",
    "Project value in BAM",
    "Status",
  ];

  return (
    <>
      <div className="w-full rounded-md border border-ashen-grey">
        <div className="flex items-center">
          <h2 className="px-4 py-[23px] font-gilroy-medium text-lg">
            Projects Table
          </h2>
          <div className="flex h-[30px] items-center bg-[#F5FFFA]">
            <h2 className="px-4 text-center font-gilroy-medium text-sm text-moss-green">
              {data.length} total
            </h2>
          </div>
          <div className="relative ml-auto mr-4">
            <input
              className="font-gilroy h-10 w-[315px] rounded-sm border border-ashen-grey pl-[46px] text-[#57585F]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={search}
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"
              alt="search-icon"
            />
          </div>
        </div>
        <table className="w-full border-t border-ashen-grey">
          <TableHead columns={columns} />
          <tbody>
            {filteredData.map((item, index) => (
              <TableRow
                rowItems={item}
                avatars={<Avatars images={getImages(item.employees)} />}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectsTable;
