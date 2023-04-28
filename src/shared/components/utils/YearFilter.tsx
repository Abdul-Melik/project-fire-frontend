import { useState } from 'react';

type Props = {
	handleYearSelect: (year: string) => void;
};

const YearFilter = ({ handleYearSelect }: Props) => {
	const [selectedYear, setSelectedYear] = useState<string>('2023');

	return (
		<div className='flex items-center'>
			<label htmlFor='years' className='mr-4 text-[22px] leading-[30px] font-bold font-gilroy-bold text-deep-forest'>
				Year:
			</label>
			<select
				className='flex justify-between gap-[10px] rounded-md border text-base border-ashen-grey pl-[12px] pr-[10px] py-2 font-bold font-gilroy-bold text-hunter-green'
				value={selectedYear}
				onChange={event => {
					handleYearSelect(event.target.value);
					setSelectedYear(event.target.value);
				}}
			>
				<option value='2023'>2023</option>
				<option value='2022'>2022</option>
				<option value='2021'>2021</option>
				<option value='2020'>2020</option>
			</select>
		</div>
	);
};

export default YearFilter;
