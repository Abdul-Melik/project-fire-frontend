import {
	projectsNumber,
	totalValue,
	avgValue,
	leadClosing,
	teamSize,
	velocity,
	weeksOver,
	hourlyPrice,
} from 'src/assets';
import InfoCard from 'src/shared/components/cards/InfoCard';
import SalesChannelsChart from 'src/components/home/performance/charts/SalesChannelsChart';
import ProjectScopeChart from 'src/components/home/performance/charts/ProjectScopeChart';
import HoursOverviewChart from 'src/components/home/performance/charts/HoursOverviewChart';

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
					amount={`${projectsInfo?.totalProjects ?? 0}`}
					iconSrc={projectsNumber}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Total project value'
					amount={
						(projectsInfo?.totalValue ?? 0).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}) + ' KM'
					}
					iconSrc={totalValue}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. project value'
					amount={
						(projectsInfo?.averageValue ?? 0).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}) + ' KM'
					}
					iconSrc={avgValue}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. lead closing (d)'
					amount={'12'}
					iconSrc={leadClosing}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. team size'
					amount={'2.2'}
					iconSrc={teamSize}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. velocity'
					amount={'64'}
					iconSrc={velocity}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Weeks over deadline'
					amount={'7'}
					iconSrc={weeksOver}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Avg. hourly price'
					amount={`$${projectsInfo?.averageHourlyRate ?? 0}`}
					iconSrc={hourlyPrice}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
			</div>
			<div className='mt-[42px] flex gap-[30px]'>
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
