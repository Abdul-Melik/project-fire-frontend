import { Link } from "react-router-dom";

type Props = {
  to: string;
  src: string;
  isActive?: boolean;
  label: string;
  isHamburgerMenu?: boolean;
};

const SidebarMenuItem = ({ to, src, isActive, label, isHamburgerMenu }: Props) => {
  const activeStyle = "bg-winter-mint font-gilroy-bold font-bold";
  const inactiveStyle = "font-gilroy-medium font-medium hover:bg-winter-mint";
  const textSizeClass = isHamburgerMenu ? "text-xl" : "text-sm";
  const imgSizeClass = isHamburgerMenu ? "w-7 h-7" : "h-5 w-5";
  return (
    <Link to={to}>
      <div
        className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
          isActive ? activeStyle : inactiveStyle
        }`}
      >
        <img src={src} className={`${imgSizeClass}`} />
        <span className={`leading-[17px] text-deep-teal ${textSizeClass}`}>{label}</span>
      </div>
    </Link>
  );
};

export default SidebarMenuItem;
