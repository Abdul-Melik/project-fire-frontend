import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const chartData: ChartData[] = [
  { name: "Sales channel #1", value: 30 },
  { name: "Sales channel #2", value: 10 },
  { name: "Sales channel #3", value: 10 },
  { name: "Sales channel #4", value: 20 },
  { name: "Sales channel #5", value: 30 },
];

const COLORS = ["#3973F8", "#3491FA", "#9D5FF3", "#FF9F5A", "#7BB99F"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={index < 3 ? "white" : "black"}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartPage: React.FC = () => {
  return (
    <div className="h-[342px] w-[510px] rounded-[6px] border border-[#DFE3E1] text-lg">
      <h2 className="ml-5 mt-5 font-GilroySemiBold">Sales Channels</h2>
      <div className="bg-gray mx-auto mt-3 h-[1px] w-11/12 bg-gray-300"></div>
      <div className="font-['Helvetica Neue'] ml-[-100px] mt-[-15px] text-sm font-medium">
        <PieChart width={500} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={chartData}
            cx={220}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            stroke="none"
            width={300}
            height={300}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={(value, entry, index) => (
              <span className="font-GilroySemiBold leading-10 text-[#0C221F]">
                {value}
              </span>
            )}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartPage;
