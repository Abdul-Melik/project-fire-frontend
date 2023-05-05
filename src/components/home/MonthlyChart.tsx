import { color } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DataSelector from "../../shared/components/utils/DataSelector";
import { useState } from "react";
import ChartSelector from "./ChartSelector";

const data = [
  {
    month: "January: 1/1/2023",
    "Grand Total Planned Revenue": 3310,
    "Grand Total Actual Revenue": 1050,
    "Grand Total Total Expenses (planned)": 3310,
    "Grand Total Total Expenses (actual)": 4500,
  },
];
const max = Math.max(
  data[0]["Grand Total Actual Revenue"],
  data[0]["Grand Total Planned Revenue"],
  data[0]["Grand Total Total Expenses (planned)"],
  data[0]["Grand Total Total Expenses (actual)"]
);

interface MonthlyChartProps {
  tickNumbers: Boolean;
}

const MonthlyChart = ({ tickNumbers }: MonthlyChartProps) => {
  const [selectedOptions, setSelectedOptions] = useState({
    firstOption: true,
    secondOption: true,
    thirdOption: true,
    fourthOption: true,
  });
  function toggleFirstOption() {
    setSelectedOptions({
      ...selectedOptions,
      firstOption: !selectedOptions.firstOption,
    });
  }
  function toggleSecondOption() {
    setSelectedOptions({
      ...selectedOptions,
      secondOption: !selectedOptions.secondOption,
    });
  }
  function toggleThirdOption() {
    setSelectedOptions({
      ...selectedOptions,
      thirdOption: !selectedOptions.thirdOption,
    });
  }
  function toggleFourthOption() {
    setSelectedOptions({
      ...selectedOptions,
      fourthOption: !selectedOptions.fourthOption,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <BarChart width={330} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={{ stroke: "#DFE3E1" }}
          dy={12}
          tick={{
            fontSize: 12,
            letterSpacing: "0.06em",
            fill: "#232F2D",
            fontFamily: "Gilroy-medium",
          }}
        />
        <YAxis
          ticks={[0, max / 4, max / 2, (3 * max) / 4, max]}
          domain={[0, max]}
          axisLine={false}
          tickLine={false}
          //remove tick numbers
          tickFormatter={!tickNumbers ? (tick) => "" : (tick) => tick}
          tick={{ fontSize: 14, fill: "#232F2D" }}
        />
        <Tooltip />
        {selectedOptions.firstOption && (
          <Bar
            dataKey="Grand Total Planned Revenue"
            fill="#FF9F5A"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        )}
        {selectedOptions.secondOption && (
          <Bar
            dataKey="Grand Total Actual Revenue"
            fill="#7BB99F"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        )}
        {selectedOptions.thirdOption && (
          <Bar
            dataKey="Grand Total Total Expenses (planned)"
            fill="#4C84F2"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        )}
        {selectedOptions.fourthOption && (
          <Bar
            dataKey="Grand Total Total Expenses (actual)"
            fill="#FDCA48"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        )}
      </BarChart>
      <div className="mt-[26px] h-[1px] w-[260px] self-end bg-[#DFE3E1]"></div>
      <div className="ml-7 mt-[26px] flex flex-col gap-4">
        <ChartSelector
          name="Grand Total Planned Revenue"
          option={selectedOptions.firstOption}
          color="#FF9F5A"
          onChange={toggleFirstOption}
        />
        <ChartSelector
          name="Grand Total Actual Revenue"
          option={selectedOptions.secondOption}
          color="#7BB99F"
          onChange={toggleSecondOption}
        />
        <ChartSelector
          name="Grand Total Expenses (planned)"
          option={selectedOptions.thirdOption}
          color="#4C84F2"
          onChange={toggleThirdOption}
        />
        <ChartSelector
          name="Grand Total Expenses (actual)"
          option={selectedOptions.fourthOption}
          color="#FDCA48"
          onChange={toggleFourthOption}
        />
      </div>
    </div>
  );
};
export default MonthlyChart;
