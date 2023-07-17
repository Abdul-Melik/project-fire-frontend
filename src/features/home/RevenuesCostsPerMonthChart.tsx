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

  const firstMonthDate = new Date();
  firstMonthDate.setMonth(firstMonthDate.getMonth() - 2);
  const firstMonth = firstMonthDate.toLocaleString("default", { month: "long" });
  const secondMonthDate = new Date();
  secondMonthDate.setMonth(secondMonthDate.getMonth() - 1);
  const secondMonth = secondMonthDate.toLocaleString("default", { month: "long" });
  const thirdDate = new Date();
  const thirdMonth = thirdDate.toLocaleString("default", { month: "long" });

  const firstMonthExpenses = expensesPerMonth.find((expense) => expense.month === firstMonth);
  const secondMonthExpenses = expensesPerMonth.find((expense) => expense.month === secondMonth);
  const thirdMonthExpenses = expensesPerMonth.find((expense) => expense.month === thirdMonth);

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
          month={firstMonth}
          expensesInfo={expensesInfo}
          amount={
            (projectsInfo?.grossProfit - (firstMonthExpenses?.actualExpense || 0)).toLocaleString("en-US", {
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
          month={secondMonth}
          item='secondItem'
          amount={
            (projectsInfo?.grossProfit - (secondMonthExpenses?.actualExpense || 0)).toLocaleString("en-US", {
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
          month={thirdMonth}
          item='thirdItem'
          amount={
            (projectsInfo?.grossProfit - (thirdMonthExpenses?.actualExpense || 0)).toLocaleString("en-US", {
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
