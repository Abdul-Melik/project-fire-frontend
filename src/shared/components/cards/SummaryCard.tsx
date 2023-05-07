type Props = {
	description: string;
	amount: string;
	className?: string;
};

const SummaryCard = ({ description, amount, className }: Props) => {
	return (
		<div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
			<p className='font-gilroy-medium text-[18px] font-medium leading-[28px] text-hunter-green'>{description}</p>
			<span className='font-gilroy-semi-bold text-[30px] font-semibold leading-[40px] text-deep-forest'>{amount}</span>
		</div>
	);
};

export default SummaryCard;
