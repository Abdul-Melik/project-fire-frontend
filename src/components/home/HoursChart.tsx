import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
	{ month: 'January: 1/1/2023', orange: 3310, blue: 450 },
	{ month: 'March: 1/3/2023', orange: 4433, blue: 705 },
	{ month: 'May: 1/5/2023', orange: 3000, blue: 3001 },
	{ month: 'July: 1/7/2023', orange: 300, blue: 4225 },
	{ month: 'September: 1/9/2023', orange: 1080, blue: 5000 },
	{ month: 'November: 1/11/2023', orange: 1501, blue: 610 },
];

const HoursChart = () => {
	const [showOrange, setShowOrange] = useState(true);
	const [showBlue, setShowBlue] = useState(true);

	return (
		<div className='box-border h-[550px] w-[1050px] rounded-md border border-solid bg-white'>
			<div className='top-0 ml-5 mt-1 inline-flex h-[68px] w-[1010px] flex-row items-center justify-between gap-2.5'>
				<div className=' flex items-center'>
					<h2 className='font-gilroy-semi-bold text-lg font-semibold not-italic text-deep-forest '>Hours Overview</h2>
					<a href='#' className='ml-3 font-inter-bold text-base font-bold not-italic text-sage-green underline '>
						See Details
					</a>
				</div>
				<div className='mr-1 flex h-[68px] flex-row items-center justify-end gap-4'>
					<div className='top-0 flex flex-row items-center gap-y-2 p-0'>
						<input
							onChange={() => setShowOrange(!showOrange)}
							className='h-[15px] w-[15px] appearance-none rounded-full border-2 border-solid border-[#FF9F5A] checked:border-transparent checked:bg-[#FF9F5A] focus:outline-none'
							type='checkbox'
							checked={showOrange}
						/>
						<p className=' ml-2 font-gilroy-medium text-sm font-medium text-gray-900'>Grand Total Hours Available</p>
					</div>
					<div className='flex flex-row items-center gap-y-2 p-0'>
						<input
							onChange={() => setShowBlue(!showBlue)}
							className='h-[15px] w-[15px] appearance-none rounded-full border-2 border-solid border-sage-green checked:border-transparent checked:bg-sage-green focus:outline-none'
							type='checkbox'
							checked={showBlue}
						/>
						<p className='ml-2 font-gilroy-medium text-sm font-medium text-gray-900'>Grand Total Hours Billed</p>
					</div>
				</div>
			</div>
			<hr className='mb-5 ml-5 mr-5'></hr>
			<div className='ml-4'>
				<BarChart width={1020} height={420} data={data} className='absolute left-0 top-0'>
					<CartesianGrid strokeDasharray='3 3' vertical={false} />
					<XAxis dataKey='month' tickLine={false} dy={12} />
					<YAxis domain={[0, 6000]} axisLine={false} tickLine={false} />
					<Tooltip />
					<g transform='translate(0, 10)'></g>
					{showOrange && <Bar dataKey='orange' fill='#FF9F5A' radius={[4, 4, 0, 0]} barSize={20} />}
					{showBlue && <Bar dataKey='blue' fill='#7BB99F' radius={[4, 4, 0, 0]} barSize={20} />}
				</BarChart>
			</div>
		</div>
	);
};

export default HoursChart;
