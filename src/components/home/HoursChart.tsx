import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import DataCard from '../../shared/components/card/DataCard';

const data = [
	{ month: 'January: 1/1/2023', 'Grand Total Hours Available': 3310, 'Grand Total Hours Billed': 450 },
	{ month: 'March: 1/3/2023', 'Grand Total Hours Available': 4433, 'Grand Total Hours Billed': 705 },
	{ month: 'May: 1/5/2023', 'Grand Total Hours Available': 3000, 'Grand Total Hours Billed': 3001 },
	{ month: 'July: 1/7/2023', 'Grand Total Hours Available': 300, 'Grand Total Hours Billed': 4225 },
	{ month: 'September: 1/9/2023', 'Grand Total Hours Available': 1080, 'Grand Total Hours Billed': 5000 },
	{ month: 'November: 1/11/2023', 'Grand Total Hours Available': 1501, 'Grand Total Hours Billed': 610 },
];

const HoursChart = () => {
	const [firstOption, setFirstOption] = useState(true);
	const [secondOption, setSecondOption] = useState(true);

	const handleSelection = () => {
		const toggleFirstOption = () => setFirstOption(!firstOption);
		const toggleSecondOption = () => setSecondOption(!secondOption);
		return { toggleFirstOption, toggleSecondOption };
	};

	return (
		<DataCard
			className='h-[392px] w-[1050px]'
			text='Hours overview'
			linkIsVisible={true}
			selectorsAreVisible={true}
			handleSelection={handleSelection}
			selectedOptions={{ firstOption, secondOption }}
			textOptions={{ textFirstOption: 'Grand Total Hours Available', textSecondOption: 'Grand Total Hours Billed' }}
		>
			<ResponsiveContainer width='100%' height='65%' className='mt-[38px]'>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray='3 3' vertical={false} />
					<XAxis
						dataKey='month'
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
						domain={[0, 6000]}
						axisLine={false}
						tickLine={false}
						tick={{ fontFamily: 'Gilroy-Medium', fontWeight: 500, fontSize: 14, fill: '#232F2D' }}
					/>
					<Tooltip />
					{firstOption && (
						<Bar dataKey='Grand Total Hours Available' fill='#FF9F5A' radius={[4, 4, 0, 0]} barSize={20} />
					)}
					{secondOption && <Bar dataKey='Grand Total Hours Billed' fill='#7BB99F' radius={[4, 4, 0, 0]} barSize={20} />}
				</BarChart>
			</ResponsiveContainer>
		</DataCard>
	);
};

export default HoursChart;
