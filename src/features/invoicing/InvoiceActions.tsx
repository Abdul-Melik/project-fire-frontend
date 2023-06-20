import { useEffect, useState } from 'react';

import { download, dollar, email, trash } from 'assets/media';
import HoverTooltip from 'components/utils/HoverTooltip';

type Props = {};

const InvoiceActions = (props: Props) => {
	const [actionLabel, setActionLabel] = useState('');
	const [actionDescription, setActionDescription] = useState('');
	const [showActionDescription, setShowActionDescription] = useState(false);

	useEffect(() => {
		if (actionDescription) setShowActionDescription(true);
		else setShowActionDescription(false);
	}, [actionDescription]);

	return (
		<div className='flex items-center gap-2'>
			<button
				className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'
				onMouseEnter={() => {
					setActionLabel('download');
					setActionDescription('Download as PDF');
				}}
				onMouseLeave={() => {
					setActionLabel('');
					setActionDescription('');
				}}
			>
				<img src={download} alt='Download icon' />
				{showActionDescription && actionLabel === 'download' && <HoverTooltip content={actionDescription} />}
			</button>
			<button
				className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'
				onMouseEnter={() => {
					setActionLabel('dollar');
					setActionDescription('Mark as Paid');
				}}
				onMouseLeave={() => {
					setActionLabel('');
					setActionDescription('');
				}}
			>
				<img src={dollar} alt='Dollar icon' />
				{showActionDescription && actionLabel === 'dollar' && <HoverTooltip content={actionDescription} />}
			</button>
			<button
				className='relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'
				onMouseEnter={() => {
					setActionLabel('email');
					setActionDescription('Mark as Sent');
				}}
				onMouseLeave={() => {
					setActionLabel('');
					setActionDescription('');
				}}
			>
				<img src={email} alt='Email icon' />
				{showActionDescription && actionLabel === 'email' && <HoverTooltip content={actionDescription} />}
			</button>
			<button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'>
				<img src={trash} alt='Trash icon' />
			</button>
		</div>
	);
};

export default InvoiceActions;
