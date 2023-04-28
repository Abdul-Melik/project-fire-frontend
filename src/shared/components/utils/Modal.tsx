import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import { motion } from 'framer-motion';

type Props = {
	header: string;
	show: boolean;
	isError: boolean;
	onCancel: () => void;
	children: React.ReactNode;
};

const Modal = ({ show, header, onCancel, isError, children }: Props) => {
	const content = (
		<>
			{show && <Backdrop onClick={() => onCancel()} />}
			{show && (
				<motion.div
					className='z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 md:w-1/4 bg-white shadow-md rounded-lg'
					initial={{ opacity: 0, x: '-50%', y: '-100%' }}
					animate={{ opacity: 1, x: '0%', y: '0%', translateX: '-50%', translateY: '-50%' }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
				>
					<header className='w-full p-4 bg-deep-teal text-white'>
						<h2>{header}</h2>
					</header>
					<div className='p-4'>{children}</div>
					<footer className='p-4'>
						<button
							className='bg-deep-teal hover:saturate-200 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline justify-center items-center mx-auto w-full content-center'
							onClick={() => onCancel()}
						>
							{isError ? 'OKAY' : 'CANCEL'}
						</button>
					</footer>
				</motion.div>
			)}
		</>
	);

	return ReactDOM.createPortal(content, document.getElementById('modal-hook') as HTMLElement);
};

export default Modal;
