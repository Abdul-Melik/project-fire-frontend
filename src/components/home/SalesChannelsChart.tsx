import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import DataCard from '../../shared/components/card/DataCard';

interface ChartData {
	name: string;
	value: number;
}

interface CustomizedLabelProps {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
}

type Props = {
	chartValues: { salesChannel: string; percentage: number }[];
};

const COLORS = ['#3973F8', '#3491FA', '#9D5FF3', '#FF9F5A', '#7BB99F'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}: CustomizedLabelProps) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill={index < 3 ? 'white' : 'black'} textAnchor='middle' dominantBaseline='central'>
			{percent !== 0 ? `${(percent * 100).toFixed(0)}%` : ''}
		</text>
	);
};

const SalesChannelsChart = ({ chartValues }: Props) => {
	const chartData: ChartData[] = [
		{
			name: 'Online',
			value:
				chartValues.length !== 0 && chartValues.find(value => value.salesChannel === 'online') !== undefined
					? chartValues.find(value => value.salesChannel === 'online')!.percentage
					: 0,
		},
		{
			name: 'In Person',
			value:
				chartValues.length !== 0 && chartValues.find(value => value.salesChannel === 'in-person') !== undefined
					? chartValues.find(value => value.salesChannel === 'in-person')!.percentage
					: 0,
		},
		{
			name: 'Referral',
			value:
				chartValues.length !== 0 && chartValues.find(value => value.salesChannel === 'referral') !== undefined
					? chartValues.find(value => value.salesChannel === 'referral')!.percentage
					: 0,
		},
		{
			name: 'Other',
			value:
				chartValues.length !== 0 && chartValues.find(value => value.salesChannel === 'other') !== undefined
					? chartValues.find(value => value.salesChannel === 'other')!.percentage
					: 0,
		},
	];

	return (
		<DataCard text='Sales Channels' className="font-['Helvetica Neue'] ml-[-100px] font-medium">
			<PieChart width={500} height={300}>
				<Pie
					dataKey='value'
					isAnimationActive={true}
					data={chartData}
					cx={220}
					cy={150}
					outerRadius={100}
					fill='#8884d8'
					labelLine={false}
					label={renderCustomizedLabel}
					stroke='none'
					width={300}
					height={300}
				>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend
					layout='vertical'
					align='right'
					verticalAlign='middle'
					iconType='circle'
					formatter={(value, entry, index) => (
						<span className='font-gilroy-semi-bold font-semibold leading-10 text-deep-forest'>{value}</span>
					)}
				/>
			</PieChart>
		</DataCard>
	);
};

export default SalesChannelsChart;
