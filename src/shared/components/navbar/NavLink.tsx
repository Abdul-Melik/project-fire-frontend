type Props = {
	text: string;
	onClick: () => void;
	className: string;
};

const NavLink = ({ text, onClick, className }: Props) => {
	return (
		<div
			className={`cursor-pointer border border-pale-jade px-4 py-[9px] text-sm leading-[22px] ${className}`}
			onClick={onClick}
		>
			{text}
		</div>
	);
};

export default NavLink;
