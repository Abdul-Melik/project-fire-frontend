import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

import { arrow } from 'src/assets/media';
import ModalSelector from 'src/components/shared/utils/ModalSelector';
import DataCard from 'src/components/shared/cards/DataCard';

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
			{ name: 'Grand Total Total Billed', value: 3000 },
			{ name: 'Grand Total Costs', value: 7000 },
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
		<div className='mt-3 flex flex-col items-center justify-center'>
			<DataCard
				header='Revenue & costs (per project) - actual'
				className='w-[330px] items-center justify-center border border-ashen-grey text-center font-gilroy-medium'
			>
				<h1
					className='absolute z-10 mt-[83px] flex cursor-pointer gap-2 font-gilroy-semi-bold text-2xl'
					onClick={() => {
						setShow(true);
					}}
				>
					{project.name} <img src={arrow} className='mt-1' />
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
				<ResponsiveContainer width='100%' height={250}>
					<PieChart>
						<Pie
							cy={110}
							data={project.value}
							innerRadius={55}
							outerRadius={80}
							paddingAngle={3}
							dataKey='value'
							startAngle={180}
							endAngle={0}
							label
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
			</DataCard>
		</div>
	);
};

export default ResponsiveRevenuePerProject;
