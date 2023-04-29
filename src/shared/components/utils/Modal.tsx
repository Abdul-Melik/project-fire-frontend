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
					className='fixed left-1/2 top-1/2 z-20 w-3/5 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-md md:w-1/4'
					initial={{ opacity: 0, x: '-50%', y: '-100%' }}
					animate={{ opacity: 1, x: '0%', y: '0%', translateX: '-50%', translateY: '-50%' }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
				>
					<header className='w-full bg-deep-teal p-4 text-white'>
						<h2>{header}</h2>
					</header>
					<div className='p-4'>{children}</div>
					<footer className='p-4'>
						<button
							className='focus:shadow-outline mx-auto w-full content-center items-center justify-center rounded bg-deep-teal px-6 py-2 font-bold text-white hover:saturate-200 focus:outline-none'
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
