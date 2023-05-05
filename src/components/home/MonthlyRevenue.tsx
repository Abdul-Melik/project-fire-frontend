import React, { useState } from "react";
import DataCard from "../../shared/components/card/DataCard";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type Props = {
  data: graphData[];
};

interface graphData = {
  month: string;
  "Grand Total Planned Revenue": number;
  "Grand Total Actual Revenue": number;
  "Grand Total Expensees (Planned)": number;
  "Grand Total Expensees (Actual)": number;
};

const MonthlyRevenue = (data: graphData) => {
  const [firstOption, setFirstOption] = useState(true);
  const [secondOption, setSecondOption] = useState(true);
  const [thirdOption, setThirdOption] = useState(true);
  const [fourthOption, setFourthOption] = useState(true);

  const handleSelection = () => {
    const toggleFirstOption = () => setFirstOption(!firstOption);
    const toggleSecondOption = () => setSecondOption(!secondOption);
    const toggleThirdOption = () => setThirdOption(!thirdOption);
    const toggleFourthOption = () => setFourthOption(!fourthOption);
    return { toggleFirstOption, toggleSecondOption };
  };
  return (
    <DataCard
      className="h-[695px] w-[1050px]"
      text="Hours overview"
      linkIsVisible={true}
      selectorsAreVisible={true}
      handleSelection={handleSelection}
      selectedOptions={{ firstOption, secondOption }}
      textOptions={{
        textFirstOption: "Grand Total Hours Available",
        textSecondOption: "Grand Total Hours Billed",
      }}
    >
      <ResponsiveContainer width="30%" height="65%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            dy={12}
            tick={{ fontSize: 12, letterSpacing: "0.06em", fill: "#232F2D" }}
          />
          <YAxis
            domain={[0, 260000]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14, fill: "#232F2D" }}
          />
          <Tooltip />
          {firstOption && (
            <Bar
              dataKey="Grand Total Planned Revenue"
              fill="#FF9F5A"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          )}
          {secondOption && (
            <Bar
              dataKey="Grand Total Actual Revenue"
              fill="#7BB99F"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          )}
          {thirdOption && (
            <Bar
              dataKey="Grand Total Expensees (Planned)"
              fill="#4C84f2"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          )}
          {fourthOption && (
            <Bar
              dataKey="Grand Total Expensees (Actual)"
              fill="#FDCA48"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </DataCard>
  );
};

export default MonthlyRevenue;
