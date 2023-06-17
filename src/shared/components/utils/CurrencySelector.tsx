import { useState } from "react";

type Props = {
  label: string;
  options: string[];
  defaultValue: string;
};

const CurrencySelector = ({ label, options, defaultValue }: Props) => {
  return (
    <div className='flex items-center pt-1 '>
      <label htmlFor='years' className='mr-2 font-gilroy-medium text-base font-medium leading-5 text-[#292929]'>
        {label}
      </label>
      <select
        className='w-full content-center rounded-md border border-[#CACCD2] py-2 pl-2 pr-3 font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]'
        id='years'
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
