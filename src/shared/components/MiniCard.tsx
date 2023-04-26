type Props = {
  description: string;
  amount: string;
  iconSrc: string;
  iconAlt: string;
  className?: string;
};

const MiniCard = ({
  description,
  amount,
  iconSrc,
  iconAlt,
  className,
}: Props) => {
  return (
    <div
      className={`flex justify-between gap-[19px] px-4 py-[10px] ${className}}`}
    >
      <div className="flex flex-col items-start gap-[2px]">
        <p className="font-Gilroy text-[14px] font-normal leading-[22px] text-[#232F2D]">
          {description}
        </p>
        <span className="font-GilroyBold text-[18px] font-bold leading-[26px] text-[#0C221F]">
          {amount}
        </span>
      </div>
      <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E9F3F2]">
        <img src={iconSrc} alt={iconAlt} />
      </div>
    </div>
  );
};

export default MiniCard;
