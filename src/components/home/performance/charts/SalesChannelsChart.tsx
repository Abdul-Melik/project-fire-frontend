import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import DataCard from 'src/shared/components/cards/DataCard';

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
	let x = cx + radius * Math.cos(-midAngle * RADIAN);
	let y = cy + radius * Math.sin(-midAngle * RADIAN);

	if (percent === 1) {
		x = cx;
		y = cy;
	}

	return (
		<text
			x={x}
			y={y}
			textAnchor='middle'
			dominantBaseline='central'
			fill={index < 3 ? 'white' : '#1D2129'}
			fontFamily='Helvetica Neue'
			fontWeight={500}
			fontSize={14}
		>
			{percent !== 0 ? `${(percent * 100).toFixed(0)}%` : ''}
		</text>
	);
};

const SalesChannelsChart = ({ chartValues }: Props) => {
	const chartData: ChartData[] = [
		{
			name: 'Online',
			value: chartValues.find(value => value.salesChannel === 'online')?.percentage ?? 0,
		},
		{
			name: 'In Person',
			value: chartValues.find(value => value.salesChannel === 'in-person')?.percentage ?? 0,
		},
		{
			name: 'Referral',
			value: chartValues.find(value => value.salesChannel === 'referral')?.percentage ?? 0,
		},
		{
			name: 'Other',
			value: chartValues.find(value => value.salesChannel === 'other')?.percentage ?? 0,
		},
	];

	const sum = chartData.reduce((total, entry) => total + entry.value, 0);
	const shouldRenderChart = sum !== 0;

	const headerContent = (
		<div className='flex items-center gap-[10px]'>
			<h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>Sales channels</h2>
		</div>
	);

	return (
		<DataCard className='h-[342px] flex-1 rounded-[6px] border border-ashen-grey bg-white' header={headerContent}>
			{shouldRenderChart ? (
				<ResponsiveContainer width='100%' height='100%' className='mt-[38px]'>
					<PieChart>
						<Pie
							dataKey='value'
							data={chartData}
							labelLine={false}
							label={renderCustomizedLabel}
							isAnimationActive={true}
							outerRadius={100}
							cx={100}
							cy={100}
							fill='#8884d8'
							stroke='none'
						>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend
							layout='vertical'
							iconType='circle'
							formatter={(value, entry, index) => (
								<span className='ml-[7px] font-gilroy-semi-bold font-semibold leading-10 text-deep-forest'>
									{value}
								</span>
							)}
							wrapperStyle={{ top: 0, marginLeft: '6vw' }}
						/>
					</PieChart>
				</ResponsiveContainer>
			) : (
				<div className='mt-[38px] font-gilroy-medium font-medium text-deep-forest'>No data to display.</div>
			)}
		</DataCard>
	);
};

export default SalesChannelsChart;
