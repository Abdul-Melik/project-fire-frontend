import React from "react";

type Props = {
  children: React.ReactNode;
};

const ModalContent: React.FC<Props> = ({ children }) => {
  return (
    <div className='absolute right-0 h-screen w-1/3 overflow-y-auto rounded-md bg-winter-mint pt-6 '>{children}</div>
  );
};

export default ModalContent;
