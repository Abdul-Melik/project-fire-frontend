import React from "react";

type Props = {
  title: string;
};

const PageHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className='flex items-center justify-between px-6'>
      <div className='mb-[16px] flex w-full rounded-lg bg-white'>
        <h1 className='py-[16px] pl-[24px] font-gilroy-bold text-xl font-bold leading-6 text-[#292929]'>{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
