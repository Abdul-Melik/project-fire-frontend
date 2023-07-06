import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CustomDateInput from "components/formElements/CustomDateInput";

type Props = {
  endDate: Date | null;
  actualEndDate: Date | null;
  handleActualEndDateInput: (date: Date | null) => void;
};

const DateInput = ({
  endDate,
  actualEndDate,
  handleActualEndDateInput,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        Actual End Date
      </span>
      <DatePicker
        customInput={<CustomDateInput width="w-full" />}
        placeholderText={endDate?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}
        selected={actualEndDate || endDate}
        onChange={(date) => handleActualEndDateInput(date)}
      />
    </div>
  );
};

export default DateInput;
