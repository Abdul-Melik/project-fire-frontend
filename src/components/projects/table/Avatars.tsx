import { useState } from "react";
import Avatar from "src/shared/components/utils/Avatar";
import HoverTooltip from "src/shared/components/utils/HoverTooltip";

type Props = {
  images?: string[];
  names?: {
    firstName: string;
    lastName: string;
  }[];
};

const Avatars = ({ images = [], names = [] }: Props) => {
  const maxVisibleAvatars = 3;
  const overflowCount = Math.max(0, images.length - maxVisibleAvatars);
  const [showEmployeeNames, setShowEmployeeNames] = useState(false);

  return (
    <div className='relative'>
      <div
        className='relative flex flex-wrap -space-x-3'
        onMouseEnter={() => setShowEmployeeNames(true)}
        onMouseLeave={() => setShowEmployeeNames(false)}
      >
        {images.slice(0, maxVisibleAvatars).map((image, index) => (
          <div
            className='hover:cursor-pointer'
            key={index}
            onMouseEnter={() => setShowEmployeeNames(true)}
            onMouseLeave={() => setShowEmployeeNames(false)}
          >
            <Avatar src={image} alt='Employee icon' names={names} />
          </div>
        ))}
        {overflowCount > 0 && (
          <div className=''>
            <div className='absolute flex h-[35px] w-[35px] items-center justify-center rounded-full bg-deep-teal font-gilroy-semi-bold text-sm font-semibold leading-[22px] text-white'>
              {overflowCount}+
            </div>
          </div>
        )}

        {showEmployeeNames && (
          <div className='absolute left-1/2 -translate-x-1/2 transform'>
            <HoverTooltip names={names} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatars;
