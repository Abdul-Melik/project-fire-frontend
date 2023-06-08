type Props = {
	className?: string;
	label: string;
	info: string;
	htmlFor: string;
	required?: boolean;
	id: string;
	step?: number;
	min?: number;
	value: number;
	handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ className, label, info, htmlFor, required, id, step, min, value, handleInput }: Props) => {
	return (
		<div className={`flex flex-1 flex-col gap-[10px] ${className}`}>
			<label className='flex items-center gap-1 font-gilroy-medium font-medium text-midnight-grey' htmlFor={htmlFor}>
				<div>{label}</div>
				<div className='text-sm text-whispering-gray'>{info}</div>
			</label>
			<input
				className='rounded-md border border-misty-lavender p-3 outline-none'
				type='number'
				id={id}
				step={step}
				min={min}
				value={value}
				onChange={handleInput}
			/>
		</div>
	);
};

export default NumberInput;
