import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LabelList,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

const chartData: ChartData[] = [
  { name: "Fixed", value: 3.75 },
  { name: "Ongoing", value: 5 },
];

const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y - 10}
      fill="#000"
      textAnchor="start"
      className="font-GilroySemiBold text-sm"
    >
      {value}
    </text>
  );
};

const barColors = ["#DFE3E1", "#7BB99F"];

const HorizontalBarChartPage: React.FC = () => {
  return (
    <div className="h-[342px] w-[510px] flex-col rounded-[6px] border border-[#DFE3E1] text-lg">
      <h2 className="ml-5 mt-5 font-GilroySemiBold">Project Scope</h2>
      <div className="bg-gray mx-auto mb-10 mt-3 h-[1px] w-11/12 bg-gray-300"></div>
      <div className="font-['Helvetica Neue'] ml-[30px] mt-[-15px] text-sm font-medium">
        <BarChart
          width={425}
          height={250}
          data={chartData}
          layout="vertical"
          barSize={40}
        >
          <CartesianGrid strokeDasharray="5 5" horizontal={false} />
          <XAxis
            ticks={[0, 1.25, 2.5, 3.75, 5]}
            type="number"
            axisLine={false}
            domain={[0, 5]}
          />
          <YAxis type="category" hide={true} dataKey="name" axisLine={false} />
          <Tooltip />
          <Bar dataKey="value" barSize={32} radius={[6, 6, 6, 6]} label="none">
            {chartData.map((entry, index) => {
              const color = entry.name == "Fixed" ? barColors[1] : barColors[0];
              return <Cell fill={color} />;
            })}
            <LabelList dataKey="name" content={CustomLabel} />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default HorizontalBarChartPage;
