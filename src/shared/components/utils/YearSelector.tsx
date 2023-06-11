import { useState } from "react";

type Props = {
  handleYearSelect: (year: string) => void;
  label: string;
  options: string[];
  defaultValue: string;
};

const YearSelector = ({ handleYearSelect, label, options, defaultValue }: Props) => {
  const [selectedYear, setSelectedYear] = useState<string>("");

  return (
    <div className='flex items-center'>
      <label htmlFor='years' className='mr-4 font-gilroy-bold text-[22px] font-bold leading-[30px] text-deep-forest'>
        {label}:
      </label>
      <select
        className='flex justify-between gap-[10px] rounded-md border border-ashen-grey py-2 pl-[12px] pr-[10px] font-gilroy-bold text-base font-bold text-hunter-green'
        id='years'
        value={selectedYear}
        onChange={(event) => {
          handleYearSelect(event.target.value);
          setSelectedYear(event.target.value);
        }}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;