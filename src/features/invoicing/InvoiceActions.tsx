import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import { download, dollar, email, trash } from 'assets/media';
import HoverTooltip from 'components/utils/HoverTooltip';

type Props = {};

const InvoiceActions = (props: Props) => {
	const ref = useRef<HTMLButtonElement | null>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [containerHeight, setContainerHeight] = useState(0);
	const [actionLabel, setActionLabel] = useState('');
	const [actionDescription, setActionDescription] = useState('');
	const [showActionDescription, setShowActionDescription] = useState(false);

	useEffect(() => {
		if (actionDescription) setShowActionDescription(true);
		else setShowActionDescription(false);
	}, [actionDescription]);

	useLayoutEffect(() => {
		setContainerWidth(ref.current?.offsetWidth ?? 0);
		setContainerHeight(ref.current?.offsetHeight ?? 0);
	}, []);

	return (
		<div className='flex items-center gap-2'>
			<div className='relative'>
				<button
					ref={ref}
					className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'
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
				</button>
				{showActionDescription && actionLabel === 'download' && (
					<HoverTooltip content={actionDescription} position={{ containerWidth, containerHeight }} />
				)}
			</div>
			<div className='relative'>
				<button
					className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'
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
				</button>
				{showActionDescription && actionLabel === 'dollar' && (
					<HoverTooltip content={actionDescription} position={{ containerWidth, containerHeight }} />
				)}
			</div>
			<div className='relative'>
				<button
					className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'
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
				</button>
				{showActionDescription && actionLabel === 'email' && (
					<HoverTooltip content={actionDescription} position={{ containerWidth, containerHeight }} />
				)}
			</div>
			<button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'>
				<img src={trash} alt='Trash icon' />
			</button>
		</div>
	);
};

export default InvoiceActions;
