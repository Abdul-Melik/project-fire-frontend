type Props = {
	label: string;
	onClick: () => void;
	className: string;
};

const NavLink = ({ label, onClick, className }: Props) => {
	return (
		<div
			className={`cursor-pointer border border-l-0 border-pale-jade px-4 py-[9px] text-sm leading-[22px] ${className}`}
			onClick={onClick}
		>
			{label}
		</div>
	);
};

export default NavLink;
