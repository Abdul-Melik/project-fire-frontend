type Props = {
	description: string;
	amount: string;
	className?: string;
};

const SummaryCard = ({ description, amount, className }: Props) => {
	return (
		<div className={`flex flex-col justify-center items-center gap-2 ${className}`}>
			<p className='font-Gilroy font-medium text-[18px] leading-[28px] text-[#232F2D]'>{description}</p>
			<span className='font-GilroyBold font-bold text-[30px] leading-[40px] text-[#0C221F]'>{amount}</span>
		</div>
	);
};

export default SummaryCard;
