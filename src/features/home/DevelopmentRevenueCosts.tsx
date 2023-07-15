import { useState, useEffect } from "react";

import { Expense, ExpensesInfo, ProjectsInfo } from "src/types";

import { revenue, directCosts, margin, avgMargin } from "assets/media";
import InfoCard from "components/cards/InfoCard";
import SummaryCard from "components/cards/SummaryCard";
import RevenuesCostsActualChart from "features/home/RevenuesCostsActualChart";
import RevenuesCostsPerMonthChart from "features/home/RevenuesCostsPerMonthChart";
import ResponsiveCostsPerProjectChart from "features/home/ResponsiveCostsPerProjectChart";
import ResponsiveCostsPerMonthChart from "features/home/ResponsiveCostsPerMonthChart";

type Props = {
  projectsInfo: ProjectsInfo;
  expensesInfo: Expense;
  expense: ExpensesInfo;
};

const DevelopmentRevenueCosts = ({ projectsInfo, expensesInfo, expense }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const windowLg = windowWidth >= 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className='flex flex-col gap-[42px]'>
      <div className='max-w-screen flex flex-col gap-[30px] lg:grid lg:grid-cols-[1fr,minmax(330px,auto)]'>
        <div className='grid auto-rows-[70px] grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[30px]'>
          <InfoCard
            className='overflow-hidden rounded-md border border-ashen-grey'
            description='Actual revenue'
            amount={
              (projectsInfo?.actualRevenue ?? 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " KM"
            }
            iconSrc={revenue}
            iconAlt='Actual revenue icon'
          />
          <InfoCard
            className='overflow-hidden rounded-md border border-ashen-grey'
            description='Planned direct costs'
            amount={
              (projectsInfo?.plannedCost ?? 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " KM"
            }
            iconSrc={directCosts}
            iconAlt='Planned direct costs icon'
          />
          <InfoCard
            className='overflow-hidden rounded-md border border-ashen-grey'
            description='Actual margin %'
            amount={(projectsInfo?.actualMargin ?? 0).toFixed(0) + "%"}
            iconSrc={margin}
            iconAlt='Actual margin icon'
          />
          <InfoCard
            className='overflow-hidden rounded-md border border-ashen-grey'
            description='Actual avg. margin'
            amount={
              (projectsInfo?.actualAvgMargin ?? 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " KM"
            }
            iconSrc={avgMargin}
            iconAlt='Actual average margin icon'
          />
        </div>
        <SummaryCard
          className='gap-2 overflow-hidden rounded-md bg-winter-mint py-3'
          descriptionClassName='text-[18px] leading-[28px]'
          amountClassName='text-[30px] leading-[40px]'
          description='Actual gross profit'
          amount={
            (projectsInfo?.grossProfit ?? 0).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " KM"
          }
        />
      </div>
      {windowLg && (
        <div className='block'>
          <RevenuesCostsActualChart projectsInfo={projectsInfo} />
          <div className='mb-[30px]'></div>
          <RevenuesCostsPerMonthChart projectsInfo={projectsInfo} expensesInfo={expensesInfo} expense={expense} />
        </div>
      )}
      {!windowLg && (
        <div className='flex flex-col gap-5'>
          <ResponsiveCostsPerProjectChart />
          <ResponsiveCostsPerMonthChart projectsInfo={projectsInfo} expensesInfo={[expensesInfo]} />
        </div>
      )}
    </div>
  );
};

export default DevelopmentRevenueCosts;
