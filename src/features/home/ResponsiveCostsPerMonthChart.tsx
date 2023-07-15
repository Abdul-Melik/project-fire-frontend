import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

import { arrow } from "assets/media";
import { responsiveCostsPerMonthChartData as data } from "src/data";
import DataCard from "components/cards/DataCard";
import { Expense, ProjectInfo, ProjectsInfo } from "src/types";
import RevenuesCostsPerMonthSelector from "src/components/selectors/RevenuesCostsPerMonthSelector";

const COLORS = ["#7BB99F", "#FF9F5A", "#4C84F2", "#FDCA48"];
type Props = {
  expensesInfo: Expense[];
  projectsInfo: ProjectsInfo;
};

const ResponsiveCostsPerMonthChart = ({ expensesInfo, projectsInfo }: Props) => {
  const [project, setProject] = useState(data[0]);
  const [infoExpenses, setInfoExpenses] = useState(expensesInfo[0]);
  const [infoProject, setInfoProject] = useState(projectsInfo);
  const [showRevenuesCostsPerMonthSelector, setShowRevenuesCostsPerMonthSelector] = useState(false);

  const selectMonth = (index: number) => {
    setInfoExpenses(expensesInfo[index]);
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
      { name: "Grand Total Planned Revenue", value: infoProject.plannedRevenue },
      { name: "Grand Total Actual Revenue", value: infoProject.actualRevenue },
      { name: "'Grand Total Total Expenses (Planned)", value: infoExpenses.totalPlannedExpense },
      { name: "Grand Total Total Expenses (Actual)", value: infoExpenses.totalActualExpense },
    ],
  };

  return (
    <DataCard header={headerContent} className='w-full border border-ashen-grey pb-8 text-center font-gilroy-medium'>
      <div className='flex w-full justify-center bg-red-300'>
        <h1
          className='absolute z-10 mt-[220px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl'
          onClick={() => {
            setShowRevenuesCostsPerMonthSelector(false);
          }}
        >
          {project.name} <img src={arrow} className='mt-1' />
        </h1>
      </div>
      <RevenuesCostsPerMonthSelector
        show={showRevenuesCostsPerMonthSelector}
        children={expensesInfo}
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
            {project.value.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend
            height={80}
            layout='vertical'
            iconType='circle'
            formatter={(value, entry, index) => <span className='leading-8 text-deep-forest'>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className='mt-14 font-inter-medium text-lg'>Revenue Gap: {project.value[0].value - project.value[1].value}</p>
    </DataCard>
  );
};

export default ResponsiveCostsPerMonthChart;
