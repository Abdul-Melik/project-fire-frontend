import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts';

import DataCard from '../../shared/components/card/DataCard';

interface ChartData {
	name: string;
	value: number;
}

type Props = {
	chartValues: { count: number; projectType: string }[];
};

const CustomLabel = (props: any) => {
	const { x, y, value } = props;
	return (
		<text
			x={x}
			y={y - 10}
			fill='#232F2D'
			textAnchor='start'
			fontFamily='Gilroy-SemiBold'
			fontWeight={600}
			fontSize={14}
		>
			{value}
		</text>
	);
};

const barColors = ['#DFE3E1', '#7BB99F'];

const ProjectScopeChart = ({ chartValues }: Props) => {
	const chartData: ChartData[] = [
		{
			name: 'Fixed',
			value:
				chartValues.length !== 0 && chartValues.find(value => value.projectType === 'fixed') !== undefined
					? chartValues.find(value => value.projectType === 'fixed')!.count
					: 0,
		},
		{
			name: 'On-going',
			value:
				chartValues.length !== 0 && chartValues.find(value => value.projectType === 'on-going') !== undefined
					? chartValues.find(value => value.projectType === 'on-going')!.count
					: 0,
		},
	];

	const maxValue = Math.max(...chartData.map(item => item.value));
	const shouldRenderChart = maxValue !== 0;

	return (
		<DataCard className='h-[342px] w-[510px]' text='Project scope'>
			{shouldRenderChart ? (
				<ResponsiveContainer width='100%' height='100%' className='mt-[38px]'>
					<BarChart data={chartData} layout='vertical' barSize={40}>
						<CartesianGrid
							strokeDasharray='6 8'
							strokeLinecap='round'
							strokeWidth={1.5}
							stroke='#DFE3E1'
							horizontal={false}
						/>
						<XAxis
							type='number'
							axisLine={false}
							tickLine={false}
							domain={[0, maxValue]}
							ticks={[0, maxValue / 4, maxValue / 2, (3 * maxValue) / 4, maxValue]}
							stroke='#232F2D'
							fontFamily='Gilroy-Regular'
							fontWeight={400}
							fontSize={14}
						/>
						<YAxis type='category' dataKey='name' axisLine={false} hide={true} />
						<Tooltip />
						<Bar dataKey='value' label='none' barSize={32} radius={[6, 6, 6, 6]}>
							{chartData.map((entry, index) => {
								const color = entry.name === 'Fixed' ? barColors[1] : barColors[0];
								return <Cell key={index} fill={color} />;
							})}
							<LabelList dataKey='name' content={CustomLabel} />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			) : (
				<div className='mt-[38px] font-gilroy-medium font-medium text-deep-forest'>No data to display.</div>
			)}
		</DataCard>
	);
};

export default ProjectScopeChart;
