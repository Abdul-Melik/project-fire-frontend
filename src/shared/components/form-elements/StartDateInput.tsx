import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

type Props = {
  className?: string;
  label: string;
  value: DateValueType | null;
  placeholder: string;
  handleChange: (value: DateValueType | null) => void;
};

const StartDateInput = ({ className, label, value, placeholder, handleChange }: Props) => {
  return (
    <div className={`flex w-full flex-col items-start gap-[5px] ${className}`}>
      <div className='font-gilroy-medium text-base font-medium leading-5 text-[#292929]'>{label}</div>
      <Datepicker
        inputClassName='w-full content-center rounded-md border border-[#CACCD2] px-3 py-2 font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]'
        primaryColor='emerald'
        asSingle={true}
        separator=''
        startWeekOn='mon'
        displayFormat={"DD/MM/YYYY"}
        placeholder={placeholder}
        popoverDirection='up'
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default StartDateInput;
