import SalesChannelsChart from './SalesChannelsChart';
import InfoCard from '../../shared/components/card/InfoCard';
import * as assets from '../../assets';
import ProjectScopeChart from './ProjectScopeChart';
import HoursChart from './HoursChart';

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
			<div className='grid gap-[30px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] auto-rows-[70px]'>
				<InfoCard
					description='Number of projects'
					amount={`${projectsInfo?.totalProjects}` ?? '0'}
					iconSrc={assets.projectsNumber}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md overflow-hidden'
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
					className='border border-ashen-grey rounded-md overflow-hidden'
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
					className='border border-ashen-grey rounded-md overflow-hidden'
				/>
				<InfoCard
					description='Avg. lead closing (d)'
					amount={'12'}
					iconSrc={assets.leadClosing}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md overflow-hidden'
				/>
				<InfoCard
					description='Avg. team size'
					amount={'2.2'}
					iconSrc={assets.teamSize}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md overflow-hidden'
				/>
				<InfoCard
					description='Avg. velocity'
					amount={'64'}
					iconSrc={assets.velocity}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md overflow-hidden'
				/>
				<InfoCard
					description='Weeks over deadline'
					amount={'7'}
					iconSrc={assets.weeksOver}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md overflow-hidden'
				/>
				<InfoCard
					description='Avg. hourly price'
					amount={`$${projectsInfo?.averageHourlyRate}` ?? '$0'}
					iconSrc={assets.hourlyPrice}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md overflow-hidden'
				/>
			</div>
			<div className='flex gap-[30px] mt-[42px]'>
				<SalesChannelsChart chartValues={projectsInfo?.salesChannelPercentage ?? []} />
				<ProjectScopeChart chartValues={projectsInfo?.projectTypeCount ?? []} />
			</div>
			<div className='mt-[42px]'>
				<HoursChart />
			</div>
		</>
	);
};

export default Performance;
