import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts';
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
		<text x={x} y={y - 10} fill='#232F2D' textAnchor='start' className='font-semibold font-gilroy-semi-bold text-sm'>
			{value}
		</text>
	);
};

const barColors = ['#DFE3E1', '#7BB99F'];

const ProjectScopeChart = ({ chartValues }: Props) => {
	const chartData: ChartData[] = [
		{
			name: 'Fixed',
			value: chartValues.length !== 0 ? chartValues.find(value => value.projectType === 'fixed')!.count : 0,
		},
		{
			name: 'On-going',
			value: chartValues.length !== 0 ? chartValues.find(value => value.projectType === 'on-going')!.count : 0,
		},
	];

	const maxValue = Math.max(...chartData.map(item => item.value));

	return (
		<DataCard text='Project Scope' className='ml-[15px] mt-[35px] font-gilroy-regular font-normal leading-4'>
			<BarChart width={425} height={220} data={chartData} layout='vertical' barSize={40}>
				<CartesianGrid
					strokeDasharray='6 8'
					strokeLinecap='round'
					horizontal={false}
					stroke='#DFE3E1'
					strokeWidth={1.5}
				/>
				<XAxis
					tickLine={false}
					ticks={[0, maxValue / 4, maxValue / 2, (3 * maxValue) / 4, maxValue]}
					type='number'
					stroke='#232F2D'
					axisLine={false}
					domain={[0, maxValue]}
				/>
				<YAxis type='category' hide={true} dataKey='name' axisLine={false} />
				<Tooltip />
				<Bar dataKey='value' barSize={32} radius={[6, 6, 6, 6]} label='none'>
					{chartData.map((entry, index) => {
						const color = entry.name == 'Fixed' ? barColors[1] : barColors[0];
						return <Cell key={index} fill={color} />;
					})}
					<LabelList dataKey='name' content={CustomLabel} />
				</Bar>
			</BarChart>
		</DataCard>
	);
};

export default ProjectScopeChart;
