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

import DataCard from "../../shared/components/card/DataCard";
import MonthlyChart from "./MonthlyChart";

const RevenuePerMonth = () => {
  return (
    <DataCard
      className="flex h-[695px] w-[1050px] "
      text="Revenue & costs (per project) - per month"
      linkIsVisible={true}
    >
      <div className="ml-[-20px] flex justify-around">
        <MonthlyChart tickNumbers={true} />
        <MonthlyChart tickNumbers={false} />
        <MonthlyChart tickNumbers={false} />
      </div>
    </DataCard>
  );
};

export default RevenuePerMonth;
