import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

import { arrow } from "assets/media";
import { responsiveCostsPerProjectChartData as data } from "src/data";
import { ProjectsInfo } from "src/types";

import RevenuesCostsActualSelector from "src/components/selectors/RevenuesCostsActualSelector";
import DataCard from "components/cards/DataCard";

const COLORS = ["#7BB99F", "#FF9F5A"];

type Props = {
  projectsInfo: ProjectsInfo;
};

const ResponsiveCostsPerProjectChart = ({ projectsInfo }: Props) => {
  const { projects } = projectsInfo;
  const [info, setInfo] = useState(projects[0]);
  const [showRevenuesCostsActualSelector, setShowRevenuesCostsActualSelector] = useState(false);

  const selectProject = (index: number) => {
    setInfo(projects[index]);
    setShowRevenuesCostsActualSelector(false);
  };

  const headerContent = (
    <div className='flex gap-[10px] self-start'>
      <h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>
        Revenues & Costs (per project) - actual
      </h2>
    </div>
  );

  const formattedInfo = {
    value: [
      { name: "Grand Total Total Billed", value: info.revenue },
      { name: "Grand Total Costs", value: info.cost },
    ],
  };

  return (
    <DataCard header={headerContent} className='w-full border border-ashen-grey text-center font-gilroy-medium'>
      <div className='flex w-full justify-center bg-red-300'>
        <h1
          className='absolute z-10 mt-[120px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl'
          onClick={() => {
            setShowRevenuesCostsActualSelector(true);
          }}
        >
          {info.name} <img src={arrow} className='mt-1' />
        </h1>
      </div>
      <RevenuesCostsActualSelector
        show={showRevenuesCostsActualSelector}
        children={projectsInfo}
        closeSelector={() => {
          setShowRevenuesCostsActualSelector(false);
        }}
        handleSelection={selectProject}
      />
      <ResponsiveContainer width='100%' height={250}>
        <PieChart>
          <Pie
            cy={110}
            data={formattedInfo.value}
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey='value'
            startAngle={180}
            endAngle={0}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    </DataCard>
  );
};

export default ResponsiveCostsPerProjectChart;
