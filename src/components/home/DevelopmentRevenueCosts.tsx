import InfoCard from '../../shared/components/card/InfoCard';
import SummaryCard from '../../shared/components/card/SummaryCard';
import * as assets from '../../assets';

const DevelopmentRevenueCosts = () => {
	return (
		<div className='grid gap-[30px] mt-7 grid-cols-[1fr,minmax(330px,auto)]'>
			<div className='grid gap-[30px] grid-cols-[repeat(auto-fit,minmax(330px,1fr))] auto-rows-[70px]'>
				<InfoCard
					description='Actual revenue'
					amount={'1,615,341.00 KM'}
					iconSrc={assets.revenue}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md box-border'
				/>
				<InfoCard
					description='Planned direct costs'
					amount={'1,890,000.00 KM'}
					iconSrc={assets.directCosts}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md box-border'
				/>
				<InfoCard
					description='Actual margin %'
					amount={'40%'}
					iconSrc={assets.margin}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md box-border'
				/>
				<InfoCard
					description='Actual avg. margin'
					amount={'102,382.00 KM'}
					iconSrc={assets.avgMargin}
					iconAlt='Mini icon'
					className='border border-ashen-grey rounded-md box-border'
				/>
			</div>
			<SummaryCard
				description='Actual gross profit'
				amount={'-284,086.00 KM'}
				className='bg-winter-mint rounded-md box-border'
			/>
		</div>
	);
};

export default DevelopmentRevenueCosts;
