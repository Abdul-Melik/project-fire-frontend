type Props = {
	description: string;
	amount: string;
	iconSrc: string;
	iconAlt: string;
	className?: string;
};

const MiniCard = ({ description, amount, iconSrc, iconAlt, className }: Props) => {
	return (
		<div className={`flex justify-between py-[10px] px-4 gap-[19px] ${className}}`}>
			<div className='flex flex-col gap-[2px] items-start'>
				<p className='font-Gilroy font-normal text-[14px] leading-[22px] text-[#232F2D]'>{description}</p>
				<span className='font-GilroyBold font-bold text-[18px] leading-[26px] text-[#0C221F]'>{amount}</span>
			</div>
			<div className='flex justify-center items-center w-[42px] h-[42px] bg-[#E9F3F2] rounded-full'>
				<img src={iconSrc} alt={iconAlt} />
			</div>
		</div>
	);
};

export default MiniCard;
