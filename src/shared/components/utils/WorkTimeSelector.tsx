type Props = {
  label: string;
  options: string[];
  defaultValue: string;
};

const WorkTimeSelector = ({ label, options, defaultValue }: Props) => {
  return (
    <div className='flex items-center '>
      <label htmlFor='years' className='mr-2 font-gilroy-medium text-base font-medium leading-5 text-[#142E2B]'>
        {label}
      </label>
      <select
        className='w-full content-center rounded-md border border-[#CACCD2] px-3 py-1 pl-1 font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]'
        id='years'
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default WorkTimeSelector;
