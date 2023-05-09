import { useState } from "react";

import NavLink from "src/shared/components/navbar/NavLink";

type Props = {
  navLabels: string[];
  handlePageSelect: (page: number) => void;
};

const Navbar = ({ navLabels, handlePageSelect }: Props) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const activeLink =
    "bg-[#F5FFFA] text-moss-green font-inter-semi-bold font-semibold";
  const inactiveLink = "text-blue-grey font-inter-regular font-normal";

  return (
    <div className="flex items-center justify-between">
      <div className="flex-start flex">
        {navLabels.map((label, index) => (
          <NavLink
            key={index}
            label={label}
            onClick={() => {
              handlePageSelect(index + 1);
              setSelectedPage(index + 1);
            }}
            className={`${
              selectedPage === index + 1 ? activeLink : inactiveLink
            } ${index === 0 ? "rounded-l border-l" : "border-l-0"} ${
              index === navLabels.length - 1 ? "rounded-r" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
