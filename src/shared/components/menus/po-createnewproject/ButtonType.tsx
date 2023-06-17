import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
  bgColor: string;
  borderColor: string;
  textColor: string;
  type?: "button" | "submit" | "reset";
};

const ButtonType: React.FC<Props> = ({ label, type, onClick, bgColor, borderColor, textColor }) => {
  return (
    <button
      className={`mr-2 flex items-center justify-center rounded-md border ${borderColor} ${bgColor} px-[16px] py-[8px] ${textColor} hover:saturate-[400%]`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonType;
