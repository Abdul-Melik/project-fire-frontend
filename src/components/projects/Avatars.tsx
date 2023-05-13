import { useState } from "react";
import avatar from "../../assets/svg/avatar.svg";

type Props = {
  images?: string[];
};

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

const Avatar = ({ src, alt, className }: AvatarProps) => {
  const [showAllEmployers, setShowAllEmployers] = useState(false);

  const handleHover = () => setShowAllEmployers(true);
  const handleLeave = () => setShowAllEmployers(false);

  return (
    <div className='relative inline-block' onMouseOver={handleHover} onMouseLeave={handleLeave}>
      <img
        className={`-ml-0.5 inline-block h-[35px] w-[35px] rounded-full border-2 border-white ${className}`}
        src={src ? src : avatar}
        alt={alt}
        style={{ objectFit: "cover" }}
      />
      {showAllEmployers && (
        <div className=' absolute left-1/2 top-[-32px] flex h-[23px] w-[357px] -translate-x-1/2  items-center justify-center whitespace-nowrap rounded bg-black p-2 text-center font-sans text-[11px] font-semibold leading-[26px] text-white'>
          Adela Pervan, Maja Prikaski, Zerina Djuheric, Faris Kunic, Tarik Mehic,
        </div>
      )}
    </div>
  );
};

const Avatars = ({ images }: Props) => {
  if (!images) {
    images = [avatar];
  }
  const avatars = images.map((url, index) => ({
    src: url,
    alt: `avatar-${index}`,
  }));

  const maxVisibleAvatars = 3;

  const overflowCount = Math.max(0, avatars.length - maxVisibleAvatars);

  return (
    <div className='-ml-0.5 flex flex-wrap -space-x-3'>
      {avatars.slice(0, maxVisibleAvatars).map((avatar, index) => (
        <Avatar key={index} src={avatar.src} alt={avatar.alt} className='-ml-1' />
      ))}
      {overflowCount > 0 && (
        <div className='-ml-0.5'>
          <span className='absolute flex h-[35px] w-[35px] items-center justify-center rounded-full bg-deep-teal text-center font-gilroy-regular text-sm font-semibold not-italic leading-[22px] text-white ring-white'>
            +{overflowCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatars;
