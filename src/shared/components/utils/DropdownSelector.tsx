import { useState, useRef, useEffect } from "react";

type Props = {
  handleDropSelect: (drop: string) => void;
  label: string;
  options: string[];
  value: string | null;
  placeholder: string;
  type: string;
};

const DropdownSelector = ({ handleDropSelect, type, label, options, value, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDrop, setSelectedDrop] = useState<string>(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedDrop(option);
    handleDropSelect(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='flex w-full flex-col items-start gap-2'>
      <label className='w-full cursor-pointer font-gilroy-medium text-base font-medium leading-5 text-[#292929]'>
        {label}
      </label>
      <div className='relative w-full' ref={dropdownRef}>
        <div
          className='flex w-full cursor-pointer items-center justify-between rounded-md border border-[#CACCD2] px-4 py-2'
          onClick={toggleDropdown}
        >
          <span className='font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]'>
            {selectedDrop || placeholder}
          </span>
          <svg
            className={`h-4 w-4 transform text-[#6C6D75] ${isOpen ? "rotate-180" : ""}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
        {isOpen && (
          <div className='absolute z-10 inline-block max-h-48 w-full overflow-y-auto rounded-md border border-[#CACCD2] bg-white shadow-lg'>
            {options.map((option) => (
              <label htmlFor={option} className='flex cursor-pointer px-4 py-2 hover:bg-gray-100' key={option}>
                <input
                  type={type}
                  id={option}
                  checked={selectedDrop.includes(option)}
                  onChange={() => handleOptionSelect(option)}
                  className='ml-1 mr-3 inline-block w-4 border-solid accent-[#142E2B]'
                />

                <span className='inline-block font-gilroy-regular text-sm text-[#6C6D75]'>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSelector;
