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
				className={`relative flex w-[110px] cursor-pointer items-center justify-between gap-[10px] rounded-md border ${
					isYearMenuOpen ? 'border-sage-green' : 'border-ashen-grey'
				} py-2 pl-[12px] pr-[10px]`}
				onClick={() => setIsYearMenuOpen(!isYearMenuOpen)}
			>
				<span className='font-gilroy-bold text-base font-bold text-hunter-green'>{selectedYear}</span>
				<img className={`transition ${isYearMenuOpen ? 'rotate-180' : ''}`} src={chevronDown} alt='Down icon' />
				{isYearMenuOpen && (
					<div className='absolute right-0 top-12 z-10 flex w-[150px] flex-col overflow-hidden rounded-md border border-ashen-grey bg-white'>
						<div
							className={`border-b border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
								selectedYear === '2021'
									? 'bg-frosty-lagoon font-gilroy-semi-bold font-semibold'
									: 'bg-white font-gilroy-medium font-medium'
							}`}
							onClick={() => {
								setSelectedYear('2021');
								handleYearSelect('2021');
							}}
						>
							2021
						</div>
						<div
							className={`border-b border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
								selectedYear === '2022'
									? 'bg-frosty-lagoon font-gilroy-semi-bold font-semibold'
									: 'bg-white font-gilroy-medium font-medium'
							}`}
							onClick={() => {
								setSelectedYear('2022');
								handleYearSelect('2022');
							}}
						>
							2022
						</div>
						<div
							className={`py-2 pl-[12px] pr-[10px] font-gilroy-medium text-base font-medium text-hunter-green ${
								selectedYear === '2023'
									? 'bg-frosty-lagoon font-gilroy-semi-bold font-semibold'
									: 'bg-white font-gilroy-medium font-medium'
							}`}
							onClick={() => {
								setSelectedYear('2023');
								handleYearSelect('2023');
							}}
						>
							2023
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default YearSelector;
