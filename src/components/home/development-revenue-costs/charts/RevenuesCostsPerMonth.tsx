import { revenuesCostsPerMonthChart } from 'src/data';
import DataCard from 'src/components/shared/cards/DataCard';
import RevenuesCostsPerMonthItem from 'src/components/home/development-revenue-costs/charts/RevenuesCostsPerMonthItem';

const RevenuesCostsPerMonth = () => {
	const headerContent = (
		<>
			<div className='flex items-center gap-[10px]'>
				<h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>
					Revenues & costs (per project) - per month
				</h2>
				<a href='#' className='font-inter-medium text-base font-medium leading-[19px] text-sage-green underline'>
					See Details
				</a>
			</div>
		</>
	);

	return (
		<DataCard className='h-[695px] rounded-[6px] border border-ashen-grey bg-white pb-5' header={headerContent}>
			<div className='flex h-full justify-around gap-[70px]'>
				<RevenuesCostsPerMonthItem
					className='h-[330px] w-[328px]'
					wrapperClassName='ml-16'
					item={1}
					data={revenuesCostsPerMonthChart.data[0]}
					revenueGap={revenuesCostsPerMonthChart.revenueGap[0]}
					tickNumbers
				/>
				<RevenuesCostsPerMonthItem
					className='h-[330px] w-[262px]'
					data={revenuesCostsPerMonthChart.data[1]}
					item={2}
					revenueGap={revenuesCostsPerMonthChart.revenueGap[1]}
				/>
				<RevenuesCostsPerMonthItem
					className='h-[330px] w-[262px]'
					data={revenuesCostsPerMonthChart.data[2]}
					item={3}
					revenueGap={revenuesCostsPerMonthChart.revenueGap[2]}
				/>
			</div>
		</DataCard>
	);
};

export default RevenuesCostsPerMonth;
