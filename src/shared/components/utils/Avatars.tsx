import { FC, useState } from "react";
import MainLayout from "src/shared/components/layout/MainLayout";
import avatarImage from "src/assets/img/avatar.png";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
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
      src={src}
      alt={alt}
      style={{ zIndex }}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
    />
  );
};

const Avatars = () => {
  const pravatarUrls = [
    "https://i.pravatar.cc/150?u=david",
    "https://i.pravatar.cc/150?u=john",
    "https://i.pravatar.cc/150?u=mary",
    "https://i.pravatar.cc/150?u=peter",
    "https://i.pravatar.cc/150?u=susan",
    "https://i.pravatar.cc/150?u=jane",
  ];

  const avatars = pravatarUrls.map((url) => ({ src: url, alt: "Pravatar" }));

  const maxVisibleAvatars = 3;

  const overflowCount = Math.max(0, avatars.length - maxVisibleAvatars);

  return (
    <MainLayout activeMenuItem={"avatars"}>
      <div className='-ml-0.5 flex flex-wrap -space-x-3'>
        {avatars.slice(0, maxVisibleAvatars).map((avatar, index) => (
          <Avatar key={index} src={avatar.src} alt={avatar.alt} className={index > 0 ? "-ml-1" : ""} />
        ))}
        {overflowCount > 0 && (
          <div className='-ml-0.5'>
            <span className='absolute flex h-[35px] w-[35px] items-center justify-center rounded-full bg-deep-teal text-center font-gilroy-regular text-sm font-semibold not-italic leading-[22px] text-white ring-white'>
              +{overflowCount}
            </span>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Avatars;
