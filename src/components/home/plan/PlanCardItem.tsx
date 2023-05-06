type Props = {
	text: string;
	amount: string;
	footer?: boolean;
	className?: string;
};

const PlanCardItem = ({ text, amount, footer = false, className }: Props) => {
	return (
		<div className={`flex items-center justify-between ${className}`}>
			<div
				className={`${
					footer
						? 'font-gilroy-semi-bold font-semibold text-deep-teal'
						: 'font-gilroy-regular font-normal text-deep-forest'
				} text-xl leading-10`}
			>
				{text}
			</div>
			<div
				className={`${
					footer ? 'font-gilroy-bold font-bold text-deep-teal' : 'font-gilroy-regular font-normal text-deep-forest'
				} text-xl leading-6`}
			>
				{amount}
			</div>
		</div>
	);
};

export default PlanCardItem;
