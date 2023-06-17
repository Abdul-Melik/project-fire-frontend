type Props = {
  className?: string;
  label: string;
  htmlFor: string;
  required?: boolean;
  type?: string;
  id: string;
  value: string;
  placeholder: string;
  handleInput: (input: string) => void;
};

const InputField = ({
  className,
  label,
  htmlFor,
  required,
  type = "text",
  id,
  value,
  placeholder,
  handleInput,
}: Props) => {
  return (
    <div className={`flex w-full flex-col items-start gap-[5px] ${className}`}>
      <label className=' font-gilroy-medium text-base font-medium leading-5 text-[#292929] ' htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className='w-full content-center rounded-md border border-[#CACCD2] px-4 py-2 font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]  '
        required={required}
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => handleInput(event.target.value)}
      />
    </div>
  );
};

export default InputField;
