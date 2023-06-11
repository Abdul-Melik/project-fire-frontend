import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import { arrow } from 'src/assets/media';
import ModalSelector from 'src/shared/components/utils/ModalSelector';
import DataCard from 'src/shared/components/cards/DataCard';

const data = [
	{
		name: 'January 1/1/2023',
		value: [
			{ name: 'Grand Total Planned Revenue', value: 18000 },
			{ name: 'Grand Total Actual Expense', value: 20000 },
			{ name: 'Grand Total Total Expenses (Planned)', value: 18000 },
			{ name: 'Grand Total Total Expenses (Actual)', value: 27000 },
		],
	},
	{
		name: 'February 1/2/2023',
		value: [
			{ name: 'Grand Total Planned Revenue', value: 1000 },
			{ name: 'Grand Total Actual Expense', value: 2100 },
			{ name: 'Grand Total Total Expenses (Planned)', value: 3000 },
			{ name: 'Grand Total Total Expenses (Actual)', value: 40000 },
		],
	},
	{
		name: 'March 1/3/2023',
		value: [
			{ name: 'Grand Total Planned Revenue', value: 18000 },
			{ name: 'Grand Total Actual Expense', value: 30000 },
			{ name: 'Grand Total Total Expenses (Planned)', value: 8000 },
			{ name: 'Grand Total Total Expenses (Actual)', value: 25000 },
		],
	},
];
const COLORS = ['#7BB99F', '#FF9F5A', '#4C84F2', '#FDCA48'];
type Props = {};

const ResponsiveCostsPerMonth = (props: Props) => {
	const [project, setProject] = useState(data[0]);
	const [show, setShow] = useState(false);
	const handleNameClick = (index: number) => {
		setProject(data[index]);
		setShow(false);
	};
	const headerContent = (
		<div className='flex gap-[10px] self-start'>
			<h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>
				Revenues and Costs (per project) - per month
			</h2>
		</div>
	);
	return (
		<DataCard header={headerContent} className='w-full border border-ashen-grey pb-8 text-center font-gilroy-medium'>
			<div className='flex w-full justify-center bg-red-300'>
				<h1
					className='absolute z-10 mt-[220px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl'
					onClick={() => {
						setShow(true);
					}}
				>
					{project.name} <img src={arrow} className='mt-1' />
				</h1>
			</div>
			<ModalSelector
				show={show}
				children={data}
				header='Select a project'
				isError={false}
				onCancel={() => {
					setShow(false);
				}}
				selectProject={handleNameClick}
			/>
			<ResponsiveContainer width='100%' height={350}>
				<PieChart>
					<Pie
						cy={110}
						data={project.value}
						innerRadius={55}
						outerRadius={80}
						paddingAngle={3}
						dataKey='value'
						startAngle={360}
						endAngle={0}
						label
					>
						{project.value.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} />
						))}
					</Pie>
					<Legend
						height={80}
						layout='vertical'
						iconType='circle'
						formatter={(value, entry, index) => <span className='leading-8 text-deep-forest'>{value}</span>}
					/>
				</PieChart>
			</ResponsiveContainer>
			<p className='mt-14 font-inter-medium text-lg'>Revenue Gap: {project.value[0].value - project.value[1].value}</p>
		</DataCard>
	);
};

export default ResponsiveCostsPerMonth;
