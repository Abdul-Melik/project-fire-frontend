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
      style={{
        transition: "transform 0.3s",
        willChange: "transform",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(-4px)";
        e.currentTarget.style.fontSize = "15px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
        e.currentTarget.style.fontSize = "";
      }}
    >
      {children}
    </tr>
  );
};

export default TableRow;
