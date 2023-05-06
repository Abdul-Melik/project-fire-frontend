import * as assets from '../../../assets';
import InfoCard from '../../../shared/components/card/InfoCard';
import SummaryCard from '../../../shared/components/card/SummaryCard';

const DevelopmentRevenueCosts = () => {
	return (
		<div className='grid grid-cols-[1fr,minmax(330px,auto)] gap-[30px]'>
			<div className='grid auto-rows-[70px] grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[30px]'>
				<InfoCard
					description='Actual revenue'
					amount={'1,615,341.00 KM'}
					iconSrc={assets.revenue}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Planned direct costs'
					amount={'1,890,000.00 KM'}
					iconSrc={assets.directCosts}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Actual margin %'
					amount={'40%'}
					iconSrc={assets.margin}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
				<InfoCard
					description='Actual avg. margin'
					amount={'102,382.00 KM'}
					iconSrc={assets.avgMargin}
					iconAlt='Mini icon'
					className='overflow-hidden rounded-md border border-ashen-grey'
				/>
			</div>
			<SummaryCard
				description='Actual gross profit'
				amount={'-284,086.00 KM'}
				className='overflow-hidden rounded-md bg-winter-mint'
			/>
		</div>
	);
};

export default DevelopmentRevenueCosts;
