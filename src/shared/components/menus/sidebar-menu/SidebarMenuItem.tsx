import { Link } from 'react-router-dom';

type Props = {
	to: string;
	src: string;
	isActive?: boolean;
	label: string;
};

const SidebarMenuItem = ({ to, src, isActive, label }: Props) => {
	const activeStyle = 'bg-winter-mint font-gilroy-bold font-bold';
	const inactiveStyle = 'font-gilroy-medium font-medium hover:bg-winter-mint';

	return (
		<Link to={to}>
			<div
				className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
					isActive ? activeStyle : inactiveStyle
				}`}
			>
				<img src={src} className='h-5 w-5' />
				<span className='text-sm leading-[17px] text-deep-teal'>{label}</span>
			</div>
		</Link>
	);
};

export default SidebarMenuItem;
