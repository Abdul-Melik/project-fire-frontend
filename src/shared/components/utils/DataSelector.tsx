type Props = {
	label: string;
	color?: string;
	checked: boolean;
	toggle: () => void;
};

const DataSelector = ({ label, color, checked, toggle }: Props) => {
	return (
		<div className='flex gap-2'>
			<input
				id='checkbox'
				type='checkbox'
				className={`h-[15px] w-[15px] appearance-none rounded-full border-2 border-solid`}
				style={{ borderColor: color, backgroundColor: checked ? color : '' }}
				checked={checked}
				onChange={() => toggle()}
			/>
			<label className='font-gilroy-medium text-sm font-medium leading-4 text-hunter-green' htmlFor='checkbox'>
				{label}
			</label>
		</div>
	);
};

export default DataSelector;
