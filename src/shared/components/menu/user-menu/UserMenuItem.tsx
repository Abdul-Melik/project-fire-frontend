type Props = {
	className?: string;
	label: string;
	onClick?: () => void;
};

const UserMenuItem = ({ className, label, onClick }: Props) => {
	return (
		<div
			className={`w-full cursor-pointer py-3 text-center font-gilroy-medium text-sm font-medium text-deep-teal hover:bg-pale-jade ${className}`}
			onClick={onClick}
		>
			{label}
		</div>
	);
};

export default UserMenuItem;
