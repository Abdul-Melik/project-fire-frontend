type Props = {
	htmlFor: string;
	label: string;
	checked: boolean;
	id: string;
	name: string;
	value: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio = ({ htmlFor, label, checked, id, name, value, handleChange }: Props) => {
	return (
		<div className='flex items-center gap-2'>
			<label htmlFor={htmlFor} className='font-gilroy-medium font-medium text-midnight-grey'>
				{label}
			</label>
			<input
				checked={checked}
				type='radio'
				id={id}
				name={name}
				value={value}
				className='h-4 w-4 border-misty-lavender bg-frost-white text-luminous-azure'
				onChange={handleChange}
			/>
		</div>
	);
};

export default Radio;
