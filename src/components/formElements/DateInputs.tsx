import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomDateInput from "components/formElements/CustomDateInput";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  handleStartDateInput: (date: Date | null) => void;
  handleEndDateInput: (date: Date | null) => void;
};

const DateInputs = ({ startDate, endDate, handleStartDateInput, handleEndDateInput }: Props) => {
  return (
    <div className='flex flex-col gap-1'>
      <span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Duration</span>
      <div className='flex w-full items-center gap-4'>
        <div>
          <DatePicker
            required
            customInput={<CustomDateInput width='w-[175px]' />}
            placeholderText={startDate?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            selected={startDate}
            onChange={(date) => handleStartDateInput(date)}
          />
        </div>
        <span className='font-gilroy-regular text-lg font-normal leading-6 text-black'>to</span>
        <div>
          <DatePicker
            required
            customInput={<CustomDateInput width='w-[175px]' />}
            placeholderText={endDate?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            selected={endDate}
            onChange={(date) => handleEndDateInput(date)}
          />
        </div>
      </div>
    </div>
  );
};

export default DateInputs;
