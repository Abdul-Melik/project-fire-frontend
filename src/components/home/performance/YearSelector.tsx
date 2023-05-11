import { useState } from 'react';

type Props = {
	handleYearSelect: (year: string) => void;
};

const YearSelector = ({ handleYearSelect }: Props) => {
	const [selectedYear, setSelectedYear] = useState<string>('2023');

	return (
		<div className='flex items-center'>
			<label htmlFor='years' className='mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest'>
				Year:
			</label>
			<select
				className='flex justify-between gap-[10px] rounded-md border border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-bold text-base font-bold text-hunter-green'
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

export default YearSelector;
