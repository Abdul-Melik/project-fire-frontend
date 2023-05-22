import { avatar } from "src/assets";

type Props = {
  src: string;
  alt: string;
  names?: {
    firstName: string;
    lastName: string;
  }[];
  className?: string;
};

const Avatar = ({ src, alt, className }: Props) => {
  return (
    <img
      className={`h-[35px] w-[35px] rounded-full border-2 border-white object-cover ${className}`}
      src={src ? src : avatar}
      alt={alt}
    />
  );
};

export default Avatar;
