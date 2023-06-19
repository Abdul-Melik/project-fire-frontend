import { useState } from 'react';

import { chevronDown } from 'assets/media';

type Props = {
	handleYearSelect: (year: string) => void;
};

const YearSelector = ({ handleYearSelect }: Props) => {
	const [selectedYear, setSelectedYear] = useState('2023');
	const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);

	return (
		<div className='flex items-center'>
			<label htmlFor='years' className='mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest'>
				Year:
			</label>
			<div
				className='relative flex w-[110px] cursor-pointer items-center justify-between gap-[10px] rounded-md border border-ashen-grey py-2 pl-[12px] pr-[10px]'
				onClick={() => setIsYearMenuOpen(!isYearMenuOpen)}
			>
				<span className='font-gilroy-bold text-base font-bold text-hunter-green'>{selectedYear}</span>
				<img className={`transition ${isYearMenuOpen ? 'rotate-180' : ''}`} src={chevronDown} alt='Down icon' />
				{isYearMenuOpen && (
					<div className='absolute left-0 top-[42px] z-10 flex w-[110px] flex-col gap-2 overflow-hidden rounded-md border border-t-0 border-ashen-grey bg-white'>
						<div
							className='py-2 pl-[12px] pr-[10px] font-gilroy-bold text-base font-bold text-hunter-green hover:bg-ashen-grey'
							onClick={() => {
								setSelectedYear('2023');
								handleYearSelect('2023');
							}}
						>
							2023
						</div>
						<div
							className='py-2 pl-[12px] pr-[10px] font-gilroy-bold text-base font-bold text-hunter-green hover:bg-ashen-grey'
							onClick={() => {
								setSelectedYear('2022');
								handleYearSelect('2022');
							}}
						>
							2022
						</div>
						<div
							className='py-2 pl-[12px] pr-[10px] font-gilroy-bold text-base font-bold text-hunter-green hover:bg-ashen-grey'
							onClick={() => {
								setSelectedYear('2021');
								handleYearSelect('2021');
							}}
						>
							2021
						</div>
						<div
							className='py-2 pl-[12px] pr-[10px] font-gilroy-bold text-base font-bold text-hunter-green hover:bg-ashen-grey'
							onClick={() => {
								setSelectedYear('2020');
								handleYearSelect('2020');
							}}
						>
							2020
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default YearSelector;
