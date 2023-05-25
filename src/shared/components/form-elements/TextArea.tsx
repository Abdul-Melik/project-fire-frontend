type Props = {
	className?: string;
	label: string;
	htmlFor: string;
	rows?: number;
	maxlength?: number;
	id: string;
	placeholder: string;
	value: string;
	required: boolean;
	handleInput: (input: string) => void;
};

const InputField = ({
	className,
	label,
	htmlFor,
	required,
	id,
	value,
	placeholder,
	maxlength = 300,
	handleInput,
}: Props) => {
	return (
		<div className={`flex h-full w-full flex-col items-start gap-[10px] ${className}`}>
			<label className='font-gilroy-medium font-medium text-midnight-grey' htmlFor={htmlFor}>
				{label}
			</label>
			<textarea
				className='h-full w-full resize-none rounded-md border border-misty-lavender p-3 leading-[22px] text-dark-indigo outline-none focus:shadow-md'
				required={required}
				id={id}
				value={value}
				placeholder={placeholder}
				maxLength={maxlength}
				onChange={event => handleInput(event.target.value)}
			/>
		</div>
	);
};

export default InputField;
