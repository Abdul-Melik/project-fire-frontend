import React, { useContext, useEffect, useState } from "react";
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
import useHttpClient from "../../shared/hooks/http-hook";
import AuthContext from "../../shared/context/auth-context";

interface ChartData {
  name: string;
  value: number;
}

type Props = {
  chartValues: { count: number; projectType: string }[];
};

interface ProjectInfo {
  totalProjects: number;
  totalValue: number;
  averageValue: number;
  averageHourlyRate: number;
  salesChannelPercentage: number[];
  projectTypeCount: number[];
}

const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y - 10}
      fill="#232F2D"
      textAnchor="start"
      className="font-GilroySemiBold text-sm"
    >
      {value}
    </text>
  );
};

const barColors = ["#DFE3E1", "#7BB99F"];

const HorizontalBarChartPage = ({ chartValues }: Props) => {
  const chartData: ChartData[] = [
    {
      name: "Fixed",
      value:
        chartValues.length !== 0
          ? chartValues.find((value) => value.projectType === "fixed")!.count
          : 0,
    },
    {
      name: "On-going",
      value:
        chartValues.length !== 0
          ? chartValues.find((value) => value.projectType === "on-going")!.count
          : 0,
    },
  ];

  const maxValue = Math.max(...chartData.map((item) => item.value));
  return (
    <div className="h-[342px] w-[510px] flex-col rounded-[6px] border border-[#DFE3E1] text-lg">
      <h2 className="ml-5 mt-5 font-GilroySemiBold text-[#232F2D]">
        Project scope
      </h2>
      <div className="bg-gray mx-auto mb-10 mt-3 h-[1px] w-11/12 bg-gray-300"></div>
      <div className="ml-[30px] mt-[-15px] font-GilroyRegular text-sm leading-4">
        <BarChart
          width={425}
          height={220}
          data={chartData}
          layout="vertical"
          barSize={40}
        >
          <CartesianGrid
            strokeDasharray="6 8"
            strokeLinecap="round"
            horizontal={false}
            stroke="#DFE3E1"
            strokeWidth={1.5}
          />
          <XAxis
            tickLine={false}
            ticks={[
              0,
              maxValue / 4,
              maxValue / 2,
              (3 * maxValue) / 4,
              maxValue,
            ]}
            type="number"
            stroke="#232F2D"
            axisLine={false}
            domain={[0, maxValue]}
          />
          <YAxis type="category" hide={true} dataKey="name" axisLine={false} />
          <Tooltip />
          <Bar dataKey="value" barSize={32} radius={[6, 6, 6, 6]} label="none">
            {chartData.map((entry, index) => {
              const color = entry.name == "Fixed" ? barColors[1] : barColors[0];
              return <Cell key={index} fill={color} />;
            })}
            <LabelList dataKey="name" content={CustomLabel} />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default HorizontalBarChartPage;
