import React from "react";
import { arrow } from "src/assets/media";

type Props = {
  onClick: () => void;
  text: string;
};

const BackButton: React.FC<Props> = ({ onClick, text }) => {
  return (
    <button
      className='font-inter-semi-semibold flex items-center justify-center self-start pb-4 pl-8 font-semibold leading-6 tracking-[-0.015rem] text-black hover:text-red-900'
      onClick={onClick}
    >
      <img src={arrow} className='mr-1 rotate-90 transform' alt='Arrow' /> {text}
    </button>
  );
};

export default BackButton;
