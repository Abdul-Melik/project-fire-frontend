type Props = {
	textFirstOption: string;
	textSecondOption: string;
	selectedOptions: {
		firstOption: boolean;
		secondOption: boolean;
	};
	onChange: () => {
		toggleFirstOption: () => void;
		toggleSecondOption: () => void;
	};
};

const DataSelector = ({ textFirstOption, textSecondOption, selectedOptions, onChange }: Props) => {
	const { firstOption, secondOption } = selectedOptions;
	const { toggleFirstOption, toggleSecondOption } = onChange();

	return (
		<div className='flex gap-4'>
			<div className='flex gap-2'>
				<input
					type='checkbox'
					className={`h-[15px] w-[15px] appearance-none rounded-full border-2 border-solid border-spicy-apricot checked:bg-spicy-apricot`}
					checked={firstOption}
					onChange={toggleFirstOption}
				/>
				<p className='font-gilroy-medium text-sm font-medium leading-4 text-hunter-green'>{textFirstOption}</p>
			</div>
			<div className='flex gap-2'>
				<input
					type='checkbox'
					className={`h-[15px] w-[15px] appearance-none rounded-full border-2 border-solid border-sage-green checked:bg-sage-green`}
					checked={secondOption}
					onChange={toggleSecondOption}
				/>
				<p className='font-gilroy-medium text-sm font-medium leading-4 text-hunter-green'>{textSecondOption}</p>
			</div>
		</div>
	);
};

export default DataSelector;
