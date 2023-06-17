type Props = {
  label: string;
  p: (string | number)[];
};

const StatusSelector = ({ label, p }: Props) => {
  let colorClass = "";

  switch (p[0]) {
    case "Active":
      colorClass = "bg-spring-fern";
      break;
    case "Inactive":
      colorClass = "bg-silver-mist";
      break;
    case "Completed":
      colorClass = "bg-cerulean-breeze";
      break;
    case "OnHold":
      colorClass = "bg-golden-tangerine";
      break;
    default:
      colorClass = "";
  }

  return (
    <div className='items-left flex flex-col'>
      <label className='font-gilroy-medium text-base font-medium leading-5 text-[#292929]'>{label}</label>
      <div className='flex items-center'>
        <div className={`h-[6px] w-[6px] rounded-full ${colorClass}`}></div>
        <p className='ml-2 font-gilroy-medium text-base font-medium leading-5 text-[#6C6D75]'>
          {p.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default StatusSelector;
