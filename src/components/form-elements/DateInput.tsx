import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

type Props = {
	className?: string;
	label: string;
	asSingle?: boolean;
	seperator?: string;
	value: DateValueType | null;
	placeholder: string;
	handleChange: (value: DateValueType | null) => void;
};

const DateInput = ({ className, label, asSingle, seperator, value, placeholder, handleChange }: Props) => {
	return (
		<div className={`flex flex-col gap-[10px] ${className}`}>
			<div className='font-gilroy-medium font-medium text-midnight-grey'>{label}</div>
			<Datepicker
				inputClassName='w-full border border-misty-lavender rounded-md p-3 outline-none text-dark-indigo focus:shadow-md'
				primaryColor='emerald'
				asSingle={asSingle}
				separator={seperator}
				startWeekOn='mon'
				displayFormat={'DD/MM/YYYY'}
				placeholder={placeholder}
				popoverDirection='up'
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default DateInput;
