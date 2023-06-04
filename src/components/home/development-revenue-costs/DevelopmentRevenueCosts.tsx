import { revenue, directCosts, margin, avgMargin } from 'src/assets/media';

import InfoCard from 'src/shared/components/cards/InfoCard';
import SummaryCard from 'src/shared/components/cards/SummaryCard';
import RevenuesCostsActual from 'src/components/home/development-revenue-costs/charts/RevenuesCostsActual';
import RevenuesCostsPerMonth from 'src/components/home/development-revenue-costs/charts/RevenuesCostsPerMonth';

const DevelopmentRevenueCosts = () => {
	return (
		<div className='flex flex-col gap-[42px]'>
			<div className='grid grid-cols-[1fr,minmax(330px,auto)] gap-[30px]'>
				<div className='grid auto-rows-[70px] grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[30px]'>
					<InfoCard
						className='overflow-hidden rounded-md border border-ashen-grey'
						description='Actual revenue'
						amount={'1,615,341.00 KM'}
						iconSrc={revenue}
						iconAlt='Mini icon'
					/>
					<InfoCard
						className='overflow-hidden rounded-md border border-ashen-grey'
						description='Planned direct costs'
						amount={'1,890,000.00 KM'}
						iconSrc={directCosts}
						iconAlt='Mini icon'
					/>
					<InfoCard
						className='overflow-hidden rounded-md border border-ashen-grey'
						description='Actual margin %'
						amount={'40%'}
						iconSrc={margin}
						iconAlt='Mini icon'
					/>
					<InfoCard
						className='overflow-hidden rounded-md border border-ashen-grey'
						description='Actual avg. margin'
						amount={'102,382.00 KM'}
						iconSrc={avgMargin}
						iconAlt='Mini icon'
					/>
				</div>
				<SummaryCard
					className='gap-2 overflow-hidden rounded-md bg-winter-mint'
					descriptionClassName='text-[18px] leading-[28px]'
					amountClassName='text-[30px] leading-[40px]'
					description='Actual gross profit'
					amount={'-284,086.00 KM'}
				/>
			</div>
			<RevenuesCostsActual />
			<RevenuesCostsPerMonth />
		</div>
	);
};

export default DevelopmentRevenueCosts;
