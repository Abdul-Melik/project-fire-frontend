type Props = {
  className?: string;
  label: string;
  info: string;
  htmlFor: string;
  required?: boolean;
  id: string;
  value: number;
  placeholder: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const NumberInput = ({ className, label, info, htmlFor, required, id, value, placeholder, handleInput }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleInput(e);
  };

  return (
    <div className={`flex flex-1 flex-col gap-[5px]  ${className}`}>
      <label className='font-gilroy-medium text-base font-medium leading-5 text-[#292929]' htmlFor={htmlFor}>
        <div>{label}</div>
        <div className='flex pl-1 font-gilroy-medium text-base font-medium leading-5 text-[#292929]'>{info}</div>
      </label>
      <input
        className='w-full content-center rounded-md border border-[#CACCD2] px-4 py-2 font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]'
        type='number'
        placeholder={placeholder}
        id={id}
        value={value !== 0 ? value : ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberInput;
