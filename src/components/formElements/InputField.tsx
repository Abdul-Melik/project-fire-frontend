type Props = {
	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	required?: boolean;
	type?: string;
	label: string;
	htmlFor: string;
	id: string;
	name: string;
	value: string;
	placeholder?: string;
	handleInput: (input: string) => void;
};

const InputField = ({
	containerClassName,
	labelClassName,
	inputClassName,
	required,
	type = 'text',
	label,
	htmlFor,
	id,
	name,
	value,
	placeholder,
	handleInput,
}: Props) => {
	return (
		<div className={`flex w-full flex-col items-start ${containerClassName}`}>
			<label
				className={`font-gilroy-medium text-base font-medium text-midnight-grey ${labelClassName}`}
				htmlFor={htmlFor}
			>
				{label}
			</label>
			<input
				className={`w-full rounded-md border font-gilroy-regular font-normal focus:shadow-md focus:ring-transparent ${inputClassName}`}
				required={required}
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				autoComplete='off'
				value={value}
				onChange={event => handleInput(event.target.value)}
			/>
		</div>
	);
};

export default InputField;
