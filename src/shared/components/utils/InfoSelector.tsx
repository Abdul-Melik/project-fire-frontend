type Props = {
  label: string;
  p: (string | number)[];
};

const InfoSelector = ({ label, p }: Props) => {
  return (
    <div className='items-left flex flex-col gap-1'>
      <label className='font-gilroy-medium text-base font-medium leading-5 text-[#292929]'>{label}</label>
      <p className='font-gilroy-medium text-base font-medium leading-5 text-[#6C6D75]'>
        {p.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </p>
    </div>
  );
};

export default InfoSelector;
