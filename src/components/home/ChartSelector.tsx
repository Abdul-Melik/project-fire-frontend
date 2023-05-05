import React, { useState } from "react";

type Props = {
  name: String;
  option: Boolean;
  color: String;
  onChange: () => void;
};

const ChartSelector = ({ name, option, color, onChange }: Props) => {
  const [optionState, setOptionState] = useState(option);
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        className={`h-[15px] w-[15px] cursor-pointer appearance-none rounded-full border-2 border-solid border-[${color}] checked:bg-[${color}]`}
        defaultChecked={optionState === true}
        onClick={() => onChange()}
      />
      <p className="font-gilroy-medium text-sm font-medium leading-4 text-[#232F2D]">
        {name}
      </p>
    </div>
  );
};

export default ChartSelector;
