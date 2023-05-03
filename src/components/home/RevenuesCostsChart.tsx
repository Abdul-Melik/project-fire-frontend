import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import RevenuesCard from "../../shared/components/card/RevenuesCard";

const data = [
  {
    organisation: "AlphaBid",
    "Grand Total Hours Available": 125310,
    "Grand Total Hours Billed": 434450,
  },
  {
    organisation: "Audiowolf",
    "Grand Total Hours Available": 554433,
    "Grand Total Hours Billed": 233705,
  },
  {
    organisation: "GIZ",
    "Grand Total Hours Available": 223000,
    "Grand Total Hours Billed": 113001,
  },
  {
    organisation: "HUB71",
    "Grand Total Hours Available": 334300,
    "Grand Total Hours Billed": 444225,
  },
  {
    organisation: "Kutuby",
    "Grand Total Hours Available": 111080,
    "Grand Total Hours Billed": 345000,
  },
  {
    organisation: "Travelspot",
    "Grand Total Hours Available": 441501,
    "Grand Total Hours Billed": 111610,
  },
  {
    organisation: "Virgin Pulse",
    "Grand Total Hours Available": 111501,
    "Grand Total Hours Billed": 444610,
  },
  {
    organisation: "Zeppelin (CAT)",
    "Grand Total Hours Available": 551501,
    "Grand Total Hours Billed": 62210,
  },
];

const RevenuesCostsChart = () => {
  const [firstOption, setFirstOption] = useState(true);
  const [secondOption, setSecondOption] = useState(true);

  const handleSelection = () => {
    const toggleFirstOption = () => setFirstOption(!firstOption);
    const toggleSecondOption = () => setSecondOption(!secondOption);
    return { toggleFirstOption, toggleSecondOption };
  };

  return (
    <RevenuesCard
      className='h-[392px] w-[1050px]'
      text='Revenues & costs (per project) - actual'
      linkIsVisible={true}
      selectorsAreVisible={true}
      handleSelection={handleSelection}
      selectedOptions={{ firstOption, secondOption }}
      textOptions={{
        textFirstOption: "Grand Total Hours Available",
        textSecondOption: "Grand Total Hours Billed",
      }}
    >
      <ResponsiveContainer width='100%' height='65%'>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis
            dataKey='organisation'
            tickLine={false}
            dy={12}
            tick={{
              fontSize: 12,
              letterSpacing: "0.06em",
              fill: "#232F2D",
              fontFamily: "Gilroy-Medium",
              fontWeight: 500,
            }}
          />
          <YAxis
            domain={[0, 600000]}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 14,
              fill: "#232F2D",
              fontFamily: "Gilroy-Medium",
              fontWeight: 500,
            }}
          />
          <Tooltip />
          {firstOption && (
            <Bar dataKey='Grand Total Hours Available' fill='#FF9F5A' radius={[4, 4, 0, 0]} barSize={20} />
          )}
          {secondOption && <Bar dataKey='Grand Total Hours Billed' fill='#7BB99F' radius={[4, 4, 0, 0]} barSize={20} />}
        </BarChart>
      </ResponsiveContainer>
    </RevenuesCard>
  );
};

export default RevenuesCostsChart;
