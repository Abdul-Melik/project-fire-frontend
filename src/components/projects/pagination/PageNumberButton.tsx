type Props = {
	pageNumber: string | number;
	isActive?: boolean;
	onClick: () => void;
};

const PageNumberButton = ({ pageNumber, isActive, onClick }: Props) => {
	return (
		<button
			className={`h-8 rounded border border-silvery-sky px-3 font-["Open_Sans"] text-sm  ${
				isActive ? 'bg-cloudy-pearl font-semibold text-shadow-slate' : 'text-opacity-45 bg-white text-black'
			}`}
			onClick={onClick}
		>
			{pageNumber}
		</button>
	);
};

export default PageNumberButton;
