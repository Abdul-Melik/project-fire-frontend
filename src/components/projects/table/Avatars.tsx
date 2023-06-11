import { useEffect, useState } from "react";
import Avatar from "src/shared/components/utils/Avatar";

type Props = {
  images?: (string | undefined)[];
  names?: {
    firstName: string;
    lastName: string;
  }[];
};

const Avatars = ({ images = [], names = [] }: Props) => {
  const [visibleAvatars, setVisibleAvatars] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 1350px)").matches) {
        setVisibleAvatars(1);
      } else {
        setVisibleAvatars(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const overflowCount = Math.max(0, images.length - visibleAvatars);

  return (
    <div className='relative flex -space-x-3'>
      {images.slice(0, visibleAvatars).map((image, index) => (
        <Avatar key={index} src={image} alt='Employee icon' names={names} />
      ))}
      {overflowCount > 0 && (
        <div className=''>
          <div className='absolute flex h-[35px] w-[35px] items-center justify-center rounded-full bg-deep-teal font-gilroy-semi-bold text-sm font-semibold leading-[22px] text-white'>
            {overflowCount}+
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatars;
