import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import DataCard from 'src/shared/components/cards/DataCard';
import DataSelector from 'src/shared/components/utils/DataSelector';

const data = [
	{
		organisation: 'AlphaBid',
		'Grand Total Revenues': 125310,
		'Grand Total Costs': 434450,
	},
	{
		organisation: 'Audiowolf',
		'Grand Total Revenues': 554433,
		'Grand Total Costs': 233705,
	},
	{
		organisation: 'GIZ',
		'Grand Total Revenues': 223000,
		'Grand Total Costs': 113001,
	},
	{
		organisation: 'HUB71',
		'Grand Total Revenues': 334300,
		'Grand Total Costs': 444225,
	},
	{
		organisation: 'Kutuby',
		'Grand Total Revenues': 111080,
		'Grand Total Costs': 345000,
	},
	{
		organisation: 'Travelspot',
		'Grand Total Revenues': 441501,
		'Grand Total Costs': 111610,
	},
	{
		organisation: 'Virgin Pulse',
		'Grand Total Revenues': 111501,
		'Grand Total Costs': 444610,
	},
	{
		organisation: 'Zeppelin (CAT)',
		'Grand Total Revenues': 551501,
		'Grand Total Costs': 62210,
	},
];

const RevenuesCostsActual = () => {
	const [firstOption, setFirstOption] = useState(true);
	const [secondOption, setSecondOption] = useState(true);

	const headerContent = (
		<>
			<div className='flex items-center gap-[10px]'>
				<h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>
					Revenues & costs (per project) - actual
				</h2>
				<a href='#' className='font-inter-medium text-base font-medium leading-[19px] text-sage-green underline'>
					See Details
				</a>
			</div>
			<div className='flex gap-4'>
				<DataSelector
					label='Grand Total Revenues'
					color='#FF9F5A'
					checked={firstOption}
					toggle={() => setFirstOption(!firstOption)}
				/>
				<DataSelector
					label='Grand Total Costs'
					color='#7BB99F'
					checked={secondOption}
					toggle={() => setSecondOption(!secondOption)}
				/>
			</div>
		</>
	);

	return (
		<DataCard className='h-[392px] rounded-[6px] border border-ashen-grey bg-white' header={headerContent}>
			<ResponsiveContainer width='100%' height='65%' className='mt-[38px]'>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray='3 3' vertical={false} />
					<XAxis
						dataKey='organisation'
						tickLine={false}
						dy={12}
						tick={{
							fontFamily: 'Gilroy-Medium',
							fontWeight: 500,
							fontSize: 12,
							letterSpacing: '0.06em',
							fill: '#232F2D',
						}}
					/>
					<YAxis
						domain={[0, 600000]}
						axisLine={false}
						tickLine={false}
						tick={{ fontFamily: 'Gilroy-Medium', fontWeight: 500, fontSize: 14, fill: '#232F2D' }}
					/>
					<Tooltip />
					{firstOption && <Bar dataKey='Grand Total Revenues' fill='#FF9F5A' radius={[4, 4, 0, 0]} barSize={20} />}
					{secondOption && <Bar dataKey='Grand Total Costs' fill='#7BB99F' radius={[4, 4, 0, 0]} barSize={20} />}
				</BarChart>
			</ResponsiveContainer>
		</DataCard>
	);
};

export default RevenuesCostsActual;
