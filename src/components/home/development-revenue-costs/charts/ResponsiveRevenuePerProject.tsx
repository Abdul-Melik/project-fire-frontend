import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import DataCard from 'src/shared/components/cards/DataCard';
import ModalSelector from 'src/shared/components/utils/ModalSelector';
const data = [
	{
		name: 'AudioWolf',
		value: [
			{ name: 'Grand Total Total Billed', value: 18000 },
			{ name: 'Grand Total Costs', value: 20000 },
		],
	},
	{
		name: 'Project Fire',
		value: [
			{ name: 'Grand Total Total Billed', value: 5000 },
			{ name: 'Grand Total Costs', value: 1000 },
		],
	},
	{
		name: 'Yewno',
		value: [
			{ name: 'Grand Total Total Billed', value: 7000 },
			{ name: 'Grand Total Costs', value: 3000 },
		],
	},
];
const COLORS = ['#7BB99F', '#FF9F5A'];
type Props = {};

const ResponsiveRevenuePerProject = (props: Props) => {
	const [project, setProject] = useState(data[0]);
	const [show, setShow] = useState(false);
	const handleNameClick = (index: number) => {
		setProject(data[index]);
		setShow(false);
	};
	return (
		<DataCard
			header='Revenue & costs (per project) - actual'
			className='w-11/12 items-center justify-center border border-ashen-grey text-center font-gilroy-medium'
		>
			<h1
				className='absolute z-50 my-3 cursor-pointer font-gilroy-semi-bold text-xl'
				onClick={() => {
					setShow(true);
				}}
			>
				{project.name}
			</h1>
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
			<ResponsiveContainer width='100%' height={300}>
				<PieChart height={320}>
					<Pie data={project.value} innerRadius={60} outerRadius={80} paddingAngle={3} dataKey='value' label>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Legend
						layout='vertical'
						iconType='circle'
						formatter={(value, entry, index) => <span className='leading-8 text-deep-forest'>{value}</span>}
					/>
				</PieChart>
			</ResponsiveContainer>
		</DataCard>
	);
};

export default ResponsiveRevenuePerProject;
