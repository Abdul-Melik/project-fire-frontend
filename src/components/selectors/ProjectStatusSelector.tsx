import { useState, useLayoutEffect, useRef } from 'react';

import { ProjectStatus } from 'src/types';
import { getProjectColorAndStatus } from 'src/helpers';
import { chevronDown } from 'assets/media';

type Props = {
	selectedProjectStatus: string;
	handleProjectStatusSelection: (projectStatus: string) => void;
};

const ProjectStatusSelector = ({ selectedProjectStatus, handleProjectStatusSelection }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [isProjectStatusSelectorOpen, setIsProjectStatusSelectorOpen] = useState(false);

	useLayoutEffect(() => {
		setWidth(ref.current?.offsetWidth ?? 0);
		setHeight(ref.current?.offsetHeight ?? 0);
	}, [isProjectStatusSelectorOpen]);

	return (
		<div className='flex flex-col gap-1'>
			<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Status</span>
			<div ref={ref} className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
				<div
					className='flex cursor-pointer items-center justify-between'
					onClick={() => setIsProjectStatusSelectorOpen(!isProjectStatusSelectorOpen)}
				>
					<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
						{selectedProjectStatus
							? getProjectColorAndStatus(selectedProjectStatus as ProjectStatus)?.status
							: 'Select project status'}
					</span>
					<img
						className={`transition ${isProjectStatusSelectorOpen ? 'rotate-180' : ''}`}
						src={chevronDown}
						alt='Down icon'
					/>
				</div>
				{isProjectStatusSelectorOpen && (
					<div
						className='absolute left-0 z-20 flex max-h-[128px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'
						style={{ width, top: height }}
					>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='radio'
								id='active'
								name='active'
								checked={selectedProjectStatus === 'Active'}
								onChange={event => {
									handleProjectStatusSelection(event.target.checked ? 'Active' : '');
									setIsProjectStatusSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='active'>
								Active
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='radio'
								id='onHold'
								name='onHold'
								checked={selectedProjectStatus === 'OnHold'}
								onChange={event => {
									handleProjectStatusSelection(event.target.checked ? 'OnHold' : '');
									setIsProjectStatusSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='onHold'>
								On hold
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen  focus:ring-transparent'
								type='radio'
								id='inactive'
								name='inactive'
								checked={selectedProjectStatus === 'Inactive'}
								onChange={event => {
									handleProjectStatusSelection(event.target.checked ? 'Inactive' : '');
									setIsProjectStatusSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='inactive'>
								Inactive
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='radio'
								id='completed'
								name='completed'
								checked={selectedProjectStatus === 'Completed'}
								onChange={event => {
									handleProjectStatusSelection(event.target.checked ? 'Completed' : '');
									setIsProjectStatusSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='completed'>
								Completed
							</label>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectStatusSelector;
