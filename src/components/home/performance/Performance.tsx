import * as assets from '../../../assets';
import InfoCard from '../../../shared/components/card/InfoCard';
import SalesChannelsChart from './SalesChannelsChart';
import ProjectScopeChart from './ProjectScopeChart';
import HoursOverviewChart from './HoursOverviewChart';

type Props = {
	projectsInfo: {
		totalProjects: number;
		totalValue: number;
		averageValue: number;
		averageHourlyRate: number;
		salesChannelPercentage: { salesChannel: string; percentage: number }[];
		projectTypeCount: { count: number; projectType: string }[];
	} | null;
};

const Performance = ({ projectsInfo }: Props) => {
	return (
		<>
			<div className='grid auto-rows-[70px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[30px]'>
				<InfoCard
					description='Number of projects'
					amount={`${projectsInfo?.totalProjects}` ?? '0'}
					iconSrc={assets.projectsNumber}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Total project value'
					amount={
						projectsInfo
							? projectsInfo.totalValue.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
							  }) + ' KM'
							: '0 KM'
					}
					iconSrc={assets.totalValue}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. project value'
					amount={
						projectsInfo
							? projectsInfo.averageValue.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
							  }) + ' KM'
							: '0 KM'
					}
					iconSrc={assets.avgValue}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. lead closing (d)'
					amount={'12'}
					iconSrc={assets.leadClosing}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. team size'
					amount={'2.2'}
					iconSrc={assets.teamSize}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. velocity'
					amount={'64'}
					iconSrc={assets.velocity}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Weeks over deadline'
					amount={'7'}
					iconSrc={assets.weeksOver}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. hourly price'
					amount={`$${projectsInfo?.averageHourlyRate}` ?? '$0'}
					iconSrc={assets.hourlyPrice}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
			</div>
			<div className='mt-[42px] flex flex-wrap gap-[30px]'>
				<SalesChannelsChart chartValues={projectsInfo?.salesChannelPercentage ?? []} />
				<ProjectScopeChart chartValues={projectsInfo?.projectTypeCount ?? []} />
			</div>
			<div className='mt-[42px]'>
				<HoursOverviewChart />
			</div>
		</>
	);
};

export default Performance;
