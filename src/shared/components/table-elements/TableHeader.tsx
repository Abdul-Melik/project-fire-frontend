import React from "react";
import search from "../../../assets/svg/search.svg";

type Props = {
  data: Project[];
  searchFunction: Function;
  searchTerm: string;
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

const TableHeader = ({ data, searchFunction, searchTerm }: Props) => {
  return (
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
          onChange={(e) => searchFunction(e.target.value)}
        />
        <img
          src={search}
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer"
          alt="search-icon"
        />
      </div>
    </div>
  );
};

export default TableHeader;
