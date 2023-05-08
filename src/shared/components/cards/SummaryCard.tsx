type Props = {
	description: string;
	amount: string;
	className?: string;
	descriptionClassName?: string;
	amountClassName?: string;
};

const SummaryCard = ({ description, amount, className, descriptionClassName, amountClassName }: Props) => {
	return (
		<div className={`flex flex-col items-center justify-center ${className}`}>
			<p className={`font-gilroy-medium font-medium text-hunter-green ${descriptionClassName}`}>{description}</p>
			<span className={`font-gilroy-semi-bold font-semibold text-deep-forest ${amountClassName}`}>{amount}</span>
		</div>
	);
};

export default SummaryCard;
