import DataSelector from 'src/shared/components/utils/DataSelector';

type Props = {
	className?: string;
	text: string;
	linkIsVisible?: boolean;
	selectorsAreVisible?: boolean;
	handleSelection?: () => {
		toggleFirstOption: () => void;
		toggleSecondOption: () => void;
	};
	selectedOptions?: {
		firstOption: boolean;
		secondOption: boolean;
	};
	textOptions?: {
		textFirstOption: string;
		textSecondOption: string;
	};
	children?: React.ReactNode;
};

const DataCard = ({
	className,
	text,
	linkIsVisible = false,
	selectorsAreVisible = false,
	handleSelection = () => ({
		toggleFirstOption: () => {},
		toggleSecondOption: () => {},
	}),
	selectedOptions = { firstOption: false, secondOption: false },
	textOptions = { textFirstOption: '', textSecondOption: '' },
	children,
}: Props) => {
	const { textFirstOption, textSecondOption } = textOptions;

	return (
		<div className={`flex flex-col rounded-[6px] border border-ashen-grey bg-white px-5 ${className}`}>
			<div className='flex items-center justify-between border-b border-b-ashen-grey py-5'>
				<div className='flex items-center gap-[10px]'>
					<h2 className='font-gilroy-semi-bold text-lg font-semibold text-deep-forest'>{text}</h2>
					{linkIsVisible && (
						<a href='#' className='font-inter-medium text-base font-medium leading-[19px] text-sage-green underline'>
							See Details
						</a>
					)}
				</div>
				{selectorsAreVisible && (
					<div className='flex gap-4'>
						<DataSelector
							label={textFirstOption}
							color='#FF9F5A'
							checked={selectedOptions.firstOption}
							toggle={handleSelection().toggleFirstOption}
						/>
						<DataSelector
							label={textSecondOption}
							color='#7BB99F'
							checked={selectedOptions.secondOption}
							toggle={handleSelection().toggleSecondOption}
						/>
					</div>
				)}
			</div>
			{children}
		</div>
	);
};

export default DataCard;
