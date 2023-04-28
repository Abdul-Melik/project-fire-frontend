type Props = {
	text: string;
	children: React.ReactNode;
	className: string;
};

const DataCard = ({ text, children, className }: Props) => {
	return (
		<div className='h-[342px] min-w-[510px] rounded-[6px] border border-ashen-grey text-lg px-5 pt-5'>
			<h2 className='font-gilroy-semi-bold font-semibold text-deep-forest'>{text}</h2>
			<div className='bg-gray mx-auto mt-3 h-[1px] w-full bg-gray-300' />
			<div className={`text-sm font-medium ${className}`}>{children}</div>
		</div>
	);
};

export default DataCard;
