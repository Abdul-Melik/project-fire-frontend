type Props = {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
	children: React.ReactNode;
};

const TableRow = ({ className, onClick, children }: Props) => {
	return (
		<tr
			className={`h-[60px] border-t border-ashen-grey text-left font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist ${className}`}
			onClick={onClick}
		>
			{children}
		</tr>
	);
};

export default TableRow;
