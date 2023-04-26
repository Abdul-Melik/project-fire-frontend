import ReactDOM from 'react-dom';

type Props = {
	onClick: () => void;
};

const Backdrop = ({ onClick }: Props) => {
	return ReactDOM.createPortal(
		<div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-40 z-10' onClick={() => onClick()}></div>,
		document.getElementById('backdrop-hook') as HTMLElement
	);
};

export default Backdrop;
