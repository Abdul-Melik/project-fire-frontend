import {
	projectsNumber,
	totalValue,
	avgValue,
	leadClosing,
	teamSize,
	velocity,
	weeksOver,
	hourlyPrice,
} from 'src/assets/media';
import InfoCard from 'src/shared/components/cards/InfoCard';
import SalesChannels from 'src/components/home/performance/charts/SalesChannels';
import ProjectScope from 'src/components/home/performance/charts/ProjectScope';
import HoursOverview from 'src/components/home/performance/charts/HoursOverview';
import ResponsiveRevenuePerProject from '../development-revenue-costs/charts/ResponsiveRevenuePerProject';

type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';

type ProjectType = 'Fixed' | 'OnGoing';

type ProjectInfo = {
	name: string;
	hourlyRate: number;
	numberOfEmployees: number;
	revenue: number;
	cost: number;
	profit: number;
};

type ProjectsInfo = {
	totalProjects: number;
	totalValue: number;
	averageValue: number;
	averageTeamSize: number;
	averageHourlyRate: number;
	salesChannelPercentage: { [key in SalesChannel]?: number };
	projectTypeCount: { [key in ProjectType]?: number };
	projects: ProjectInfo[];
};

type Props = {
	projectsInfo: ProjectsInfo | null;
};

const Performance = ({ projectsInfo }: Props) => {
	return (
		<div className='flex flex-col gap-[42px]'>
			<div className='lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] lg:gap-[30px] grid max-w-[100%] auto-rows-[70px] grid-cols-[repeat(auto-fit,minmax(240px,100%))] justify-center gap-[15px] lg:max-w-none'>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Number of projects'
					amount={`${projectsInfo?.totalProjects ?? 0}`}
					iconSrc={projectsNumber}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Total project value'
					amount={
						(projectsInfo?.totalValue ?? 0).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}) + ' KM'
					}
					iconSrc={totalValue}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Avg. project value'
					amount={
						(projectsInfo?.averageValue ?? 0).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						}) + ' KM'
					}
					iconSrc={avgValue}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Avg. lead closing (d)'
					amount={'12'}
					iconSrc={leadClosing}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Avg. team size'
					amount={(projectsInfo?.averageTeamSize ?? 0).toFixed(1).toString()}
					iconSrc={teamSize}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Avg. velocity'
					amount={'64'}
					iconSrc={velocity}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Weeks over deadline'
					amount={'7'}
					iconSrc={weeksOver}
					iconAlt='Mini icon'
				/>
				<InfoCard
					className='overflow-hidden rounded-md border border-ashen-grey'
					description='Avg. hourly price'
					amount={`$${(projectsInfo?.averageHourlyRate ?? 0).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}`}
					iconSrc={hourlyPrice}
					iconAlt='Mini icon'
				/>
			</div>
			<div className='block gap-[30px] md:flex md:flex-row'>
				<SalesChannels chartValues={projectsInfo?.salesChannelPercentage ?? {}} />
				<div className='mb-[30px] md:hidden'></div>
				<ProjectScope chartValues={projectsInfo?.projectTypeCount ?? {}} />
			</div>
			<div className='hidden lg:block'>
				<HoursOverview />
			</div>
			<div className='block lg:hidden'>
				<ResponsiveRevenuePerProject />
			</div>
		</div>
	);
};

export default Performance;
