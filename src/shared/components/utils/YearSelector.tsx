import { useState } from 'react';
import Select, { components } from 'react-select';
import arrow from 'src/assets/media/svg/arrow.svg';

type Props = {
	handleYearSelect: (year: string) => void;
	label: string;
	options: string[];
	defaultValue: string;
};

const YearSelector = ({ handleYearSelect, label, options, defaultValue }: Props) => {
	const [selectedYear, setSelectedYear] = useState<string>(defaultValue);

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			width: '105px',
			height: '40px',
			fontFamily: 'Gilroy-Bold',
			border: '1px solid #DFE3E1',
			borderRadius: '6px',
			paddingLeft: '8px',
			paddingRight: '8px',
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
			width: '160px',
			marginLeft: '-55px',
		}),
	};

	const CustomDropdownIndicator = (props: any) => {
		return (
			<components.DropdownIndicator {...props}>
				<img src={arrow} alt='Arrow' />
			</components.DropdownIndicator>
		);
	};

	return (
		<div className='flex items-center'>
			<label htmlFor='years' className='mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest'>
				{label}:
			</label>
			<Select
				id='years'
				defaultValue={{ value: defaultValue, label: defaultValue }}
				isSearchable={false}
				components={{
					IndicatorSeparator: () => null,
					DropdownIndicator: CustomDropdownIndicator,
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
