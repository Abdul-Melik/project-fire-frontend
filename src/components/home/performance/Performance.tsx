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
import SalesChannels from 'src/components/home/performance/charts/SalesChannels';
import ProjectScope from 'src/components/home/performance/charts/ProjectScope';
import HoursOverview from 'src/components/home/performance/charts/HoursOverview';

type Props = {
	projectsInfo: {
		totalProjects: number;
		totalValue: number;
		averageValue: number;
		averageTeamSize: number;
		averageHourlyRate: number;
		salesChannelPercentage: { salesChannel: string; percentage: number }[];
		projectTypeCount: { count: number; projectType: string }[];
	} | null;
};

const Performance = ({ projectsInfo }: Props) => {
	return (
		<div className='flex flex-col gap-[42px]'>
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
					amount={(projectsInfo?.averageTeamSize ?? 0).toFixed(1).toString()}
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
					amount={`$${(projectsInfo?.averageHourlyRate ?? 0).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}`}
					iconSrc={hourlyPrice}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
			</div>
			<div className='flex gap-[30px]'>
				<SalesChannels chartValues={projectsInfo?.salesChannelPercentage ?? []} />
				<ProjectScope chartValues={projectsInfo?.projectTypeCount ?? []} />
			</div>
			<HoursOverview />
		</div>
	);
};

export default Performance;
