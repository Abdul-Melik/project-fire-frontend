import React from "react";

type Props = {
  children: React.ReactNode;
};

const FormButtons: React.FC<Props> = ({ children }) => {
  return (
    <div className='mt-7 flex h-[88px] w-full justify-end bg-white '>
      <div className='flex h-full items-center justify-end px-6 font-semibold'>{children}</div>
    </div>
  );
};

export default FormButtons;
