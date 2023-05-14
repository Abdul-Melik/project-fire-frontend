import DataCard from 'src/shared/components/cards/DataCard';
import RevenuesCostsPerMonthItem from 'src/components/home/development-revenue-costs/charts/RevenuesCostsPerMonthItem';

const data = [
	[
		{
			month: 'January: 1/1/2023',
			'Grand Total Planned Revenue': 210000,
			'Grand Total Actual Revenue': 210000,
			'Grand Total Total Expenses (Planned)': 150000,
			'Grand Total Total Expenses (Actual)': 260000,
		},
	],
	[
		{
			month: 'February: 1/2/2023',
			'Grand Total Planned Revenue': 210000,
			'Grand Total Actual Revenue': 210000,
			'Grand Total Total Expenses (Planned)': 150000,
			'Grand Total Total Expenses (Actual)': 260000,
		},
	],
	[
		{
			month: 'March: 1/3/2023',
			'Grand Total Planned Revenue': 210000,
			'Grand Total Actual Revenue': 210000,
			'Grand Total Total Expenses (Planned)': 150000,
			'Grand Total Total Expenses (Actual)': 260000,
		},
	],
];

const revenueGaps = ['914.00 KM', '10,000.00 KM', '-15,000.00 KM'];

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
					data={data[0]}
					revenueGap={revenueGaps[0]}
					tickNumbers
				/>
				<RevenuesCostsPerMonthItem className='h-[330px] w-[262px]' data={data[1]} revenueGap={revenueGaps[1]} />
				<RevenuesCostsPerMonthItem className='h-[330px] w-[262px]' data={data[2]} revenueGap={revenueGaps[2]} />
			</div>
		</DataCard>
	);
};

export default RevenuesCostsPerMonth;
