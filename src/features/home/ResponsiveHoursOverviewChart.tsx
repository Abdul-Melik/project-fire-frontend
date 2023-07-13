import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

import { EmployeeInfo } from "src/types";
import { arrow } from "assets/media";
import HoursOverviewSelector from "components/selectors/HoursOverviewSelector";
import DataCard from "components/cards/DataCard";

const COLORS = ["#7BB99F", "#FF9F5A"];

type Props = {
  employeesInfo: EmployeeInfo[];
};

const ResponsiveHoursOverview = ({ employeesInfo }: Props) => {
  const [info, setInfo] = useState(employeesInfo[0]);
  const [showHoursOverviewSelector, setShowHoursOverviewSelector] =
    useState(false);

  const selectMonth = (index: number) => {
    setInfo(employeesInfo[index]);
    setShowHoursOverviewSelector(false);
  };

  const headerContent = (
    <div className="flex gap-[10px] self-start">
      <h2 className="font-gilroy-semi-bold text-lg font-semibold text-deep-forest">
        Hours Overview
      </h2>
    </div>
  );

  const formattedInfo = {
    value: [
      { name: "Grand Total Hours Available", value: info.totalHoursAvailable },
      { name: "Grand Total Hours Billed", value: info.totalHoursBilled },
    ],
  };

  return (
    <DataCard
      header={headerContent}
      className="w-full rounded-md border border-ashen-grey text-center font-gilroy-medium"
    >
      <div className="flex w-full justify-center bg-red-300">
        <h1
          className="absolute z-10 mt-[120px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl"
          onClick={() => {
            setShowHoursOverviewSelector(true);
          }}
        >
          {info.month} <img src={arrow} className="mt-1" />
        </h1>
      </div>
      <HoursOverviewSelector
        show={showHoursOverviewSelector}
        children={employeesInfo}
        closeSelector={() => {
          setShowHoursOverviewSelector(false);
        }}
        handleSelection={selectMonth}
      />
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            cy={110}
            data={formattedInfo.value}
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            label
          >
            {employeesInfo.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            height={80}
            layout="vertical"
            iconType="circle"
            formatter={(value, _) => (
              <span className="leading-8 text-deep-forest">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </DataCard>
  );
};

export default ResponsiveHoursOverview;
