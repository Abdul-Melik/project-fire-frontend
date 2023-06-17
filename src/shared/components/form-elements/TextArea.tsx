type Props = {
  className?: string;
  label: string;
  htmlFor: string;
  rows?: number;
  maxlength?: number;
  id: string;
  placeholder: string;
  value: string;
  required: boolean;
  handleInput: (input: string) => void;
};

const InputField = ({
  className,
  label,
  htmlFor,
  required,
  id,
  value,
  placeholder,
  maxlength = 300,
  handleInput,
}: Props) => {
  return (
    <div className={`flex w-full flex-col items-start gap-[5px] ${className}`}>
      <label className='font-gilroy-regular text-base font-medium leading-5 text-[#292929]' htmlFor={htmlFor}>
        {label}
      </label>
      <textarea
        className='w-full  rounded-md border border-[#CACCD2] p-2 px-4 py-2 font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]  '
        required={required}
        id={id}
        value={value}
        placeholder={placeholder}
        maxLength={maxlength}
        onChange={(event) => handleInput(event.target.value)}
      />
    </div>
  );
};

export default InputField;
