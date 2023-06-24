type Props = {
	className?: string;
	children?: React.ReactNode;
};

const Main = ({ className, children }: Props) => {
	return <main className={`mt-4 ${className}`}>{children}</main>;
};

export default Main;
