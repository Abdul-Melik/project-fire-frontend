import React, { useContext } from 'react';

import { toast } from 'react-toastify';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import Circle from 'src/assets/media/svg/Circle.svg';
import Exclamation from 'src/assets/media/svg/Exclamation.svg';

interface AlertModalProps {
	onClose: () => void;
	onDeleteProject: () => void;
	alertTitle: string;
	alertDescription: string;
	confirmButtonText: string;
	cancelButtonText: string;
	color: string;
}

const AlertModal = ({
	onClose,
	onDeleteProject,
	alertTitle,
	alertDescription,
	confirmButtonText,
	cancelButtonText,
	color,
}: AlertModalProps) => {
	const closeModal = () => {
		onClose();
	};

	const handleDelete = () => {
		onDeleteProject(); // Call handleDeleteProject with projectId
		closeModal();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-30'>
			<div className='relative flex max-w-[400px] flex-col rounded-md bg-white p-6'>
				<div className='absolute w-6'>
					<img src={Circle} className='h-6 w-6' />
					<img src={Exclamation} className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
				</div>

				<header className='text-md pl-10 font-gilroy-bold'>{alertTitle}</header>
				<p className='mb-3 mt-3 max-w-[384px] pl-10 font-gilroy-regular text-sm leading-6'>{alertDescription} </p>
				<div className='mt-2 flex justify-end gap-2'>
					<button
						className='rounded-md border border-[#1A3835] px-4 py-2 font-inter-semi-bold text-[#1A3835] '
						onClick={closeModal}
					>
						{cancelButtonText || 'Cancel'}
					</button>
					<button className={`rounded-md ${color} px-4 py-2 font-inter-semi-bold text-white`} onClick={handleDelete}>
						{confirmButtonText || 'Confirm'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AlertModal;
