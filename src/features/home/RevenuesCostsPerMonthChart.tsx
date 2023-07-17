import DataCard from "components/cards/DataCard";
import RevenuesCostsPerMonthChartItem from "features/home/RevenuesCostsPerMonthChartItem";
import { useState } from "react";
import { ExpensesInfo, ProjectsInfo } from "src/types";

type Props = {
  selectedYear: string;
  projectsInfo: ProjectsInfo;
  expensesInfo: ExpensesInfo;
};

const RevenuesCostsPerMonthChart = ({ selectedYear, projectsInfo, expensesInfo }: Props) => {
  const { expensesPerMonth } = expensesInfo;

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const previousMonth = previousMonthDate.toLocaleString("default", { month: "long" });

  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const nextMonth = nextMonthDate.toLocaleString("default", { month: "long" });

  const currentMonthExpenses = expensesPerMonth.find((expense) => expense.month === currentMonth);
  const previousMonthExpenses = expensesPerMonth.find((expense) => expense.month === previousMonth);
  const nextMonthExpenses = expensesPerMonth.find((expense) => expense.month === nextMonth);

  const headerContent = (
    <>
      <div className='flex items-center gap-[10px]'>
        <h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>
          Revenues & costs (per project) - per month
        </h2>
        <a href='#' className='font-inter-medium text-base font-medium leading-[19px] text-sage-green underline'>
          See Details
        </a>
      </div>
    </>
  );

  return (
    <DataCard className='h-[695px] rounded-[6px] border border-ashen-grey bg-white pb-5' header={headerContent}>
      <div className='flex h-full justify-around gap-[70px]'>
        <RevenuesCostsPerMonthChartItem
          className='h-[330px] w-[328px]'
          wrapperClassName='ml-16'
          item='firstItem'
          data='month'
          selectedYear={selectedYear}
          projectsInfo={projectsInfo}
          month={previousMonth}
          expensesInfo={expensesInfo}
          amount={
            (projectsInfo?.grossProfit - (previousMonthExpenses?.actualExpense || 0)).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " KM"
          }
          tickNumbers
        />
        <RevenuesCostsPerMonthChartItem
          className='h-[330px] w-[262px]'
          data='month'
          selectedYear={selectedYear}
          projectsInfo={projectsInfo}
          expensesInfo={expensesInfo}
          month={currentMonth}
          item='secondItem'
          amount={
            (projectsInfo?.grossProfit - (currentMonthExpenses?.actualExpense || 0)).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " KM"
          }
        />
        <RevenuesCostsPerMonthChartItem
          className='h-[330px] w-[262px]'
          data='month'
          selectedYear={selectedYear}
          projectsInfo={projectsInfo}
          expensesInfo={expensesInfo}
          month={nextMonth}
          item='thirdItem'
          amount={
            (projectsInfo?.grossProfit - (nextMonthExpenses?.actualExpense || 0)).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " KM"
          }
        />
      </div>
    </DataCard>
  );
};

export default RevenuesCostsPerMonthChart;
