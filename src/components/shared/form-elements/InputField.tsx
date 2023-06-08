type Props = {
	className?: string;
	label: string;
	htmlFor: string;
	required?: boolean;
	type?: string;
	id: string;
	value: string;
	placeholder: string;
	handleInput: (input: string) => void;
};

const InputField = ({
	className,
	label,
	htmlFor,
	required,
	type = 'text',
	id,
	value,
	placeholder,
	handleInput,
}: Props) => {
	return (
		<div className={`flex w-full flex-col items-start gap-[10px] ${className}`}>
			<label className='font-gilroy-medium font-medium text-midnight-grey' htmlFor={htmlFor}>
				{label}
			</label>
			<input
				className='w-full rounded-md border border-misty-lavender p-3 text-dark-indigo outline-none focus:shadow-md'
				required={required}
				type={type}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={event => handleInput(event.target.value)}
			/>
		</div>
	);
};

export default InputField;
