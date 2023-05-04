type Props = {
	label: string;
	htmlFor: string;
	type: string;
	id: string;
	placeholder: string;
	value: string;
	required: boolean;
	handleInput: (variable: string) => void;
};

const FormInput = ({ label, htmlFor, type, id, placeholder, value, required, handleInput }: Props) => {
	return (
		<div className='mb-[21px] flex w-full flex-col items-start gap-[10px]'>
			<label className='font-gilroy-medium font-medium text-midnight-grey' htmlFor={htmlFor}>
				{label}
			</label>
			<input
				className='w-full rounded-md border border-misty-lavender py-3 pl-3 pr-[10px] text-dark-indigo outline-none focus:shadow-md'
				onChange={event => handleInput(event.target.value)}
				type={type}
				id={id}
				value={value}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
};

export default FormInput;
