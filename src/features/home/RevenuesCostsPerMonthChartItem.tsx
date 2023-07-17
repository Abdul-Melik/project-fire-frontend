import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { months } from "src/data";
import { ExpensesInfo, ProjectsInfo } from "src/types";

import DataSelector from "components/selectors/DataSelector";
import SummaryCard from "components/cards/SummaryCard";

type Props = {
  className?: string;
  wrapperClassName?: string;
  item: string;
  data: string;
  tickNumbers?: boolean;
  projectsInfo: ProjectsInfo;
  expensesInfo: ExpensesInfo;
  month: string;
  amount: string;
  selectedYear: string;
};

const RevenuesCostsPerMonthChartItem = ({
  className,
  wrapperClassName,
  item,
  projectsInfo,
  month,
  amount,
  tickNumbers = false,
  expensesInfo,
  selectedYear,
}: Props) => {
  const [firstOption, setFirstOption] = useState(true);
  const [secondOption, setSecondOption] = useState(true);
  const [thirdOption, setThirdOption] = useState(true);
  const [fourthOption, setFourthOption] = useState(true);

  const { expensesPerMonth } = expensesInfo;

  const data =
    projectsInfo && expensesInfo
      ? expensesPerMonth
          .filter((item) => item.month === month)
          .map((item) => {
            const actualExpenseItem = expensesPerMonth.find((expense) => expense.month === item.month);
            return {
              month:
                `${item.month}: ` + new Date(Number(selectedYear), months.indexOf(item.month)).toLocaleDateString(),
              totalExpensesActual: actualExpenseItem ? actualExpenseItem.actualExpense : 0,
              totalExpensesPlanned: item.plannedExpense,
              actualRevenue: projectsInfo.actualRevenue,
              plannedRevenue: projectsInfo.plannedRevenue,
            };
          })
      : [];

  const maxValue = Math.max(
    ...data.map((item) =>
      Math.max(
        projectsInfo.actualRevenue,
        projectsInfo.plannedRevenue,
        expensesInfo.totalPlannedExpenses,
        expensesInfo.totalActualExpenses
      )
    )
  );

  return (
    <div className='flex h-full flex-col'>
      <div className={`${className}`}>
        <ResponsiveContainer width='100%' height='80%' className='mt-[38px]'>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='month'
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
            {tickNumbers && (
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
            )}
            <Tooltip />
            {firstOption && <Bar dataKey='actualRevenue' fill='#FF9F5A' radius={[4, 4, 0, 0]} barSize={20} />}
            {secondOption && <Bar dataKey='plannedRevenue' fill='#7BB99F' radius={[4, 4, 0, 0]} barSize={20} />}
            {thirdOption && <Bar dataKey='totalExpensesPlanned' fill='#4C84F2' radius={[4, 4, 0, 0]} barSize={20} />}
            {fourthOption && <Bar dataKey='totalExpensesActual' fill='#FDCA48' radius={[4, 4, 0, 0]} barSize={20} />}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={`flex flex-col ${wrapperClassName}`}>
        <div className='mb-[26px] border border-ashen-grey' />
        <div className='mb-[30px] flex flex-col justify-center gap-4'>
          <DataSelector
            label='Grand Total Planned Revenue'
            htmlFor={`revenuesCostsPerMonthFirstOption${item}`}
            id={`revenuesCostsPerMonthFirstOption${item}`}
            name={`revenuesCostsPerMonthFirstOption${item}`}
            color='#FF9F5A'
            checked={firstOption}
            toggle={() => setFirstOption(!firstOption)}
          />
          <DataSelector
            label='Grand Total Actual Revenue'
            htmlFor={`revenuesCostsPerMonthSecondOption${item}`}
            id={`revenuesCostsPerMonthSecondOption${item}`}
            name={`revenuesCostsPerMonthSecondOption${item}`}
            color='#7BB99F'
            checked={secondOption}
            toggle={() => setSecondOption(!secondOption)}
          />
          <DataSelector
            label='Grand Total Total Expenses (Planned)'
            htmlFor={`revenuesCostsPerMonthThirdOption${item}`}
            id={`revenuesCostsPerMonthThirdOption${item}`}
            name={`revenuesCostsPerMonthThirdOption${item}`}
            color='#4C84F2'
            checked={thirdOption}
            toggle={() => setThirdOption(!thirdOption)}
          />
          <DataSelector
            label='Grand Total Total Expenses (Actual)'
            htmlFor={`revenuesCostsPerMonthFourthOption${item}`}
            id={`revenuesCostsPerMonthFourthOption${item}`}
            name={`revenuesCostsPerMonthFourthOption${item}`}
            color='#FDCA48'
            checked={fourthOption}
            toggle={() => setFourthOption(!fourthOption)}
          />
        </div>
        <SummaryCard
          className='h-[100px] w-full gap-[6px] overflow-hidden rounded-md bg-winter-mint'
          descriptionClassName='text-sm leading-[22px]'
          amountClassName='text-2xl'
          description={"Revenue gap"}
          amount={amount}
        />
      </div>
    </div>
  );
};

export default RevenuesCostsPerMonthChartItem;
