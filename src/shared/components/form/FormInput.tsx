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
		<div className='flex flex-col gap-[10px] items-start mb-[21px] w-full'>
			<label className='font-medium font-gilroy-medium text-midnight-grey' htmlFor={htmlFor}>
				{label}
			</label>
			<input
				className='text-dark-indigo py-3 pl-3 pr-[10px] rounded-md outline-none border border-misty-lavender w-full focus:shadow-md'
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
