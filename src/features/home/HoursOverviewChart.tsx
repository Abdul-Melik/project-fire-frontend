import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { EmployeeInfo } from "src/types";
import DataSelector from "components/selectors/DataSelector";
import DataCard from "components/cards/DataCard";

type Props = {
  employeesInfo: EmployeeInfo[];
};

const HoursOverviewChart = ({ employeesInfo }: Props) => {
  const [firstOption, setFirstOption] = useState(true);
  const [secondOption, setSecondOption] = useState(true);

  const headerContent = (
    <>
      <div className="flex items-center gap-[10px]">
        <h2 className="font-gilroy-semi-bold text-lg font-semibold text-deep-forest">
          Hours overview
        </h2>
        <a
          href="#"
          className="font-inter-medium text-base font-medium leading-[19px] text-sage-green underline"
        >
          See Details
        </a>
      </div>
      <div className="flex gap-4">
        <DataSelector
          label="Grand Total Hours Available"
          htmlFor="hoursOverviewFirstOption"
          id="hoursOverviewFirstOption"
          name="hoursOverviewFirstOption"
          color="#FF9F5A"
          checked={firstOption}
          toggle={() => setFirstOption(!firstOption)}
        />
        <DataSelector
          label="Grand Total Hours Billed"
          htmlFor="hoursOverviewSecondOption"
          id="hoursOverviewSecondOption"
          name="hoursOverviewSecondOption"
          color="#7BB99F"
          checked={secondOption}
          toggle={() => setSecondOption(!secondOption)}
        />
      </div>
    </>
  );

  const data = employeesInfo.filter((_, index) => index % 2 === 0);

  const totalHoursAvailableArray = data.map(
    ({ totalHoursAvailable }) => totalHoursAvailable
  );

  const maxValue = Math.max(...totalHoursAvailableArray);
  const renderChart = maxValue > 0;

  return (
    <DataCard
      className="h-[392px] rounded-md border border-ashen-grey bg-white"
      header={headerContent}
    >
      {renderChart ? (
        <ResponsiveContainer width="100%" height="65%" className="mt-[38px]">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              dy={12}
              tick={{
                fontFamily: "GilroyMedium",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "0.06em",
                fill: "#232F2D",
              }}
            />
            <YAxis
              domain={[0, maxValue]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: "GilroyMedium",
                fontWeight: 500,
                fontSize: 14,
                fill: "#232F2D",
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "totalHoursAvailable")
                  return [value, "Grand Total Hours Available"];
                if (name === "totalHoursBilled")
                  return [value, "Grand Total Hours Billed"];
                return [value, name];
              }}
            />
            {firstOption && (
              <Bar
                dataKey="totalHoursAvailable"
                fill="#FF9F5A"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            )}
            {secondOption && (
              <Bar
                dataKey="totalHoursBilled"
                fill="#7BB99F"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="mt-[38px] font-gilroy-medium font-medium text-deep-forest">
          No data to display.
        </div>
      )}
    </DataCard>
  );
};

export default HoursOverviewChart;
