import DataCard from '../../../shared/components/card/DataCard';
import PlanCardItem from './PlanCardItem';

const Plan = () => {
	return (
		<div className='flex flex-col gap-[30px]'>
			<DataCard text='Revenues & costs (per project) - per month'>
				<div className='mt-[11px] flex flex-col gap-[5px]'>
					<PlanCardItem text='Development' amount='2,400,000.00 KM' />
					<PlanCardItem text='Design' amount='7,800,000.00 KM' />
					<PlanCardItem text='Other' amount='45,900,000.00 KM' />
					<PlanCardItem text='Total revenue' amount='2,400,000.00 KM' />
					<PlanCardItem
						text='NET PROFIT 2023'
						amount='91,800,000.00 KM'
						footer={true}
						className='mx-[-20px] bg-winter-mint px-5 pb-[3px] pt-[6px]'
					/>
				</div>
			</DataCard>
			<DataCard text='Expenses'>
				<div className='mt-[11px] flex flex-col gap-[5px]'>
					<PlanCardItem text='Direct' amount='4,400,000.00 KM' />
					<PlanCardItem text='Indirect' amount='1,400,000.00 KM' />
					<PlanCardItem text='Marketing' amount='8,400,000.00 KM' />
					<PlanCardItem text='HR costs' amount='400,000.00 KM' />
					<PlanCardItem text='Office cost' amount='100,000.00 KM' />
					<PlanCardItem text='Sales costs' amount='50,000.00 KM' />
					<PlanCardItem text='Other costs' amount='800.00 KM' />
					<PlanCardItem
						text='TOTAL EXPENSES'
						amount='91,800,000.00 KM'
						footer={true}
						className='mx-[-20px] bg-winter-mint px-5 pb-[3px] pt-[6px]'
					/>
				</div>
			</DataCard>
		</div>
	);
};

export default Plan;
