type Props = {
	className?: string;
	label: string;
	htmlFor: string;
	hidden?: boolean;
	id: string;
	checked?: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ className, label, htmlFor, hidden, id, checked, handleChange }: Props) => {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<label
				htmlFor={htmlFor}
				className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'
				hidden={hidden}
			>
				{label}
			</label>
			<input
				className='h-4 w-4 rounded border-misty-lavender bg-frost-white text-luminous-azure'
				id={id}
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
		</div>
	);
};

export default Checkbox;
