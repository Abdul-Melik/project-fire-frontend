import ReactDOM from 'react-dom';

type Props = {
	onClick: () => void;
};

const Backdrop = ({ onClick }: Props) => {
	return ReactDOM.createPortal(
		<div className='fixed left-0 top-0 z-10 h-screen w-full bg-black bg-opacity-40' onClick={() => onClick()}></div>,
		document.getElementById('backdrop-hook') as HTMLElement
	);
};

export default Backdrop;
