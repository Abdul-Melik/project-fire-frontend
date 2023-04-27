type Props = {
	description: string;
	amount: string;
	iconSrc: string;
	iconAlt: string;
	className?: string;
};

const InfoCard = ({ description, amount, iconSrc, iconAlt, className }: Props) => {
	return (
		<div className={`flex justify-between py-[10px] px-4 gap-[19px] ${className}}`}>
			<div className='flex flex-col gap-[2px] items-start'>
				<p className='font-gilroy-regular font-normal text-[14px] leading-[22px] text-hunter-green'>{description}</p>
				<span className='font-gilroy-bold font-bold text-[18px] leading-[26px] text-deep-forest'>{amount}</span>
			</div>
			<div className='flex justify-center items-center w-[42px] h-[42px] bg-winter-mint rounded-full'>
				<img src={iconSrc} alt={iconAlt} />
			</div>
		</div>
	);
};

export default InfoCard;
