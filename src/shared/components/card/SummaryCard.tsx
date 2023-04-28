type Props = {
	description: string;
	amount: string;
	className?: string;
};

const SummaryCard = ({ description, amount, className }: Props) => {
	return (
		<div className={`flex flex-col justify-center items-center gap-2 ${className}`}>
			<p className='font-gilroy-medium font-medium text-[18px] leading-[28px] text-hunter-green'>{description}</p>
			<span className='font-gilroy-semi-bold font-semibold text-[30px] leading-[40px] text-deep-forest'>{amount}</span>
		</div>
	);
};

export default SummaryCard;
