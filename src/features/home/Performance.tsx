import { useState, useEffect } from "react";

import { EmployeeInfo, ProjectsInfo } from "src/types";
import {
  projectsNumber,
  totalValue,
  avgValue,
  leadClosing,
  teamSize,
  velocity,
  weeksOver,
  hourlyPrice,
} from "assets/media";
import { averageLeadClosingData } from "src/data";
import InfoCard from "components/cards/InfoCard";
import SalesChannelsChart from "features/home/SalesChannelsChart";
import ProjectScopeChart from "features/home/ProjectScopeChart";
import HoursOverviewChart from "features/home/HoursOverviewChart";
import ResponsiveHoursOverviewChart from "features/home/ResponsiveHoursOverviewChart";

type Props = {
  selectedYear: string;
  projectsInfo: ProjectsInfo;
  employeesInfo: EmployeeInfo[];
};

const Performance = ({ selectedYear, projectsInfo, employeesInfo }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const windowLg = windowWidth >= 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <div className="flex flex-col gap-[42px]">
      <div className="grid max-w-[100%] auto-rows-[70px] grid-cols-[repeat(auto-fit,minmax(240px,100%))] justify-center gap-[15px] lg:max-w-none lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] lg:gap-[30px]">
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Number of projects"
          amount={`${projectsInfo.totalProjects}`}
          iconSrc={projectsNumber}
          iconAlt="Number of projects icon"
        />
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Total project value"
          amount={
            projectsInfo.totalValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " KM"
          }
          iconSrc={totalValue}
          iconAlt="Total project value icon"
        />
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Avg. project value"
          amount={
            projectsInfo.averageValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) + " KM"
          }
          iconSrc={avgValue}
          iconAlt="Average project value icon"
        />
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Avg. lead closing (d)"
          amount={(
            averageLeadClosingData.find((data) => data.year === selectedYear)
              ?.value ?? 0
          )
            .toFixed(1)
            .toString()}
          iconSrc={leadClosing}
          iconAlt="Average lead closing icon"
        />
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Avg. team size"
          amount={projectsInfo.averageTeamSize.toFixed(1).toString()}
          iconSrc={teamSize}
          iconAlt="Average team size icon"
        />

        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Avg. velocity"
          amount={projectsInfo.averageVelocity.toFixed(1)}
          iconSrc={velocity}
          iconAlt="Average velocity icon"
        />
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Weeks over deadline"
          amount={(projectsInfo.weeksOverDeadline ?? 0).toFixed(1)}
          iconSrc={weeksOver}
          iconAlt="Weeks over deadline icon"
        />
        <InfoCard
          className="overflow-hidden rounded-md border border-ashen-grey"
          description="Avg. hourly price"
          amount={`$${projectsInfo.averageRate.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          iconSrc={hourlyPrice}
          iconAlt="Average hourly price icon"
        />
      </div>

      <div className="block gap-[30px] lg:flex lg:flex-row">
        <SalesChannelsChart chartValues={projectsInfo.salesChannelPercentage} />
        <div className="mb-[30px] lg:hidden"></div>
        <ProjectScopeChart chartValues={projectsInfo.projectTypeCount} />
      </div>
      {windowLg && (
        <div className="block">
          <HoursOverviewChart employeesInfo={employeesInfo} />
        </div>
      )}
      {!windowLg && (
        <div className="block">
          <ResponsiveHoursOverviewChart employeesInfo={employeesInfo} />
        </div>
      )}
    </div>
  );
};

export default Performance;
