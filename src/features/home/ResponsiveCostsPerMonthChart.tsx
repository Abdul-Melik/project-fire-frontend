import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

import { arrow } from "assets/media";
import { responsiveCostsPerMonthChartData as data } from "src/data";
import { months } from "src/data";
import { ExpensesInfo, ProjectsInfo } from "src/types";

import RevenuesCostsPerMonthSelector from "src/components/selectors/RevenuesCostsPerMonthSelector";
import DataCard from "components/cards/DataCard";

const COLORS = ["#7BB99F", "#FF9F5A", "#4C84F2", "#FDCA48"];

type Props = {
  selectedYear: string;
  expensesInfo: ExpensesInfo;
  projectsInfo: ProjectsInfo;
};

const ResponsiveCostsPerMonthChart = ({ expensesInfo, projectsInfo, selectedYear }: Props) => {
  const { expensesPerMonth } = expensesInfo;
  const [infoExpenses, setInfoExpenses] = useState(expensesPerMonth[0]);
  const [showRevenuesCostsPerMonthSelector, setShowRevenuesCostsPerMonthSelector] = useState(false);

  const selectMonth = (index: number) => {
    setInfoExpenses(expensesPerMonth[index]);
    setShowRevenuesCostsPerMonthSelector(false);
  };

  const headerContent = (
    <div className='flex gap-[10px] self-start'>
      <h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>
        Revenues and Costs (per project) - per month
      </h2>
    </div>
  );
  const formattedInfo = {
    value: [
      { name: "Grand Total Planned Revenue", value: projectsInfo.plannedRevenue },
      { name: "Grand Total Actual Revenue", value: projectsInfo.actualRevenue },
      { name: "'Grand Total Total Expenses (Planned)", value: infoExpenses.plannedExpense },
      { name: "Grand Total Total Expenses (Actual)", value: infoExpenses.actualExpense },
    ],
  };
  {
    infoExpenses.month;
  }
  return (
    <DataCard header={headerContent} className='w-full border border-ashen-grey pb-8 text-center font-gilroy-medium'>
      <div className='flex w-full justify-center bg-red-300'>
        <h1
          className='absolute z-10 mt-[220px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl'
          onClick={() => {
            setShowRevenuesCostsPerMonthSelector(true);
          }}
        >
          {`${infoExpenses.month}: ` +
            new Date(Number(selectedYear), months.indexOf(infoExpenses.month)).toLocaleDateString()}
          <img src={arrow} className='mt-1' />
        </h1>
      </div>
      <RevenuesCostsPerMonthSelector
        show={showRevenuesCostsPerMonthSelector}
        children={expensesInfo}
        selectedYear={selectedYear}
        closeSelector={() => {
          setShowRevenuesCostsPerMonthSelector(false);
        }}
        handleSelection={selectMonth}
      />
      <ResponsiveContainer width='100%' height={350}>
        <PieChart>
          <Pie
            cy={110}
            data={formattedInfo.value}
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey='value'
            startAngle={360}
            endAngle={0}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend
            height={80}
            layout='vertical'
            iconType='circle'
            formatter={(value, _) => <span className='leading-8 text-deep-forest'>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className='mt-14 font-inter-medium text-lg'>
        Revenue Gap:
        {(projectsInfo?.grossProfit + infoExpenses.actualExpense).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + " KM"}
      </p>
    </DataCard>
  );
};

export default ResponsiveCostsPerMonthChart;
