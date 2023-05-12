import axios from "axios";
import { FC, Key, useState } from "react";
import avatar from "../../assets/img/avatar.png";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

//prop types
type Props = {
  images: string[];
};

const Avatar: FC<AvatarProps> = ({ src, alt, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const zIndex = isHovered ? 2 : 0;

  return (
    <img
      className={`-ml-0.5 inline-block h-[35px] w-[35px] rounded-full border-2 border-white ${className}`}
      src={src ? src : avatar}
      alt={alt}
      style={{ zIndex }}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
    />
  );
};

const Avatars = ({ images }: Props) => {
  //create variable that will hold array of objects from the images array
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
    <div className="-ml-0.5 flex flex-wrap -space-x-3">
      {avatars.slice(0, maxVisibleAvatars).map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          className={!images ? "-ml-1 rounded-none" : "-ml-1"}
        />
      ))}
      {overflowCount > 0 && (
        <div className="-ml-0.5">
          <span className="absolute flex h-[35px] w-[35px] items-center justify-center rounded-full bg-deep-teal text-center font-gilroy-regular text-sm font-semibold not-italic leading-[22px] text-white ring-white">
            +{overflowCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatars;
