import { useState } from 'react';
import Select from 'react-select';

type Props = {
	handleYearSelect: (year: string) => void;
	label: string;
	options: string[];
	defaultValue: string;
};

const YearSelector = ({ handleYearSelect, label, options, defaultValue }: Props) => {
	const [selectedYear, setSelectedYear] = useState<string>('');

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			width: '120px',
			height: '40px',
			fontFamily: 'Gilroy-Bold',
			backgroundColor: 'white',
			border: '1px solid #DFE3E1',
			borderRadius: '6px',
			paddingLeft: '8px',
			paddingRight: '10px',
			fontSize: '16px',
			fontWeight: 'bold',
			color: 'black',
		}),
		option: (provided: any, state: any) => {
			const isLastOption = options.indexOf(state.data.value) === options.length - 1;
			const borderBottom = isLastOption ? '0' : '1px solid #DFE3E1';
			return {
				...provided,
				backgroundColor: state.isFocused ? '#EFF8F7' : 'white',
				color: state.isFocused ? 'black' : 'inherit',
				fontSize: '1rem',
				fontFamily: 'Gilroy-Medium',
				fontWeight: '500',
				borderBottom,
			};
		},
		menu: (provided: any) => ({
			...provided,
			zIndex: 9999,
			width: '160px',
			marginLeft: '-40px',
		}),
	};

	return (
		<div className='flex items-center'>
			<label htmlFor='years' className='mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest'>
				{label}:
			</label>
			<Select
				id='years'
				defaultInputValue='2023'
				isSearchable={false}
				components={{
					IndicatorSeparator: () => null,
				}}
				options={options.map(option => ({ value: option, label: option }))}
				value={{ value: selectedYear, label: selectedYear }}
				onChange={(selectedOption: any) => {
					handleYearSelect(selectedOption.value);
					setSelectedYear(selectedOption.value);
				}}
				styles={customStyles}
			/>
		</div>
	);
};

export default YearSelector;
