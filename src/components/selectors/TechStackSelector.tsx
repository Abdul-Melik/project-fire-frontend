import { useState, useLayoutEffect, useRef } from 'react';

import { TechStack } from 'src/types';
import { getEmployeeTechStack } from 'src/helpers';
import { chevronDown } from 'assets/media';

type Props = {
	selectedDepartment: string;
	selectedTechStack: string;
	handleTechStackSelection: (techStack: string) => void;
};

const TechStackSelector = ({ selectedDepartment, selectedTechStack, handleTechStackSelection }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [isTechStackSelectorOpen, setIsTechStackSelectorOpen] = useState(false);

	useLayoutEffect(() => {
		setWidth(ref.current?.offsetWidth ?? 0);
		setHeight(ref.current?.offsetHeight ?? 0);
	}, [isTechStackSelectorOpen]);

	return (
		<div className='flex flex-col gap-1'>
			<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Tech Stack</span>
			<div ref={ref} className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
				<div
					className='flex cursor-pointer items-center justify-between'
					onClick={() => setIsTechStackSelectorOpen(!isTechStackSelectorOpen)}
				>
					<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
						{!selectedTechStack ? 'Select stack' : getEmployeeTechStack(selectedTechStack as TechStack)}
					</span>
					<img
						className={`transition ${isTechStackSelectorOpen ? 'rotate-180' : ''}`}
						src={chevronDown}
						alt='Down icon'
					/>
				</div>
				{isTechStackSelectorOpen && (
					<div
						className='absolute left-0 flex flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'
						style={{ width, top: height }}
					>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='checkbox'
								id='na'
								name='na'
								checked={selectedTechStack === 'AdminNA' || selectedTechStack === 'MgmtNA'}
								onChange={event => {
									handleTechStackSelection(
										event.target.checked ? (selectedDepartment === 'Administration' ? 'AdminNA' : 'MgmtNA') : ''
									);
									setIsTechStackSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='na'>
								N/A
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen  focus:ring-transparent'
								type='checkbox'
								id='fullstack'
								name='fullstack'
								checked={selectedTechStack === 'FullStack'}
								onChange={event => {
									handleTechStackSelection(event.target.checked ? 'FullStack' : '');
									setIsTechStackSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='fullstack'>
								Full Stack
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen  focus:ring-transparent'
								type='checkbox'
								id='backend'
								name='backend'
								checked={selectedTechStack === 'Backend'}
								onChange={event => {
									handleTechStackSelection(event.target.checked ? 'Backend' : '');
									setIsTechStackSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='backend'>
								Back End
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='checkbox'
								id='frontend'
								name='frontend'
								checked={selectedTechStack === 'Frontend'}
								onChange={event => {
									handleTechStackSelection(event.target.checked ? 'Frontend' : '');
									setIsTechStackSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='frontend'>
								Front End
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='checkbox'
								id='uxui'
								name='uxui'
								checked={selectedTechStack === 'UXUI'}
								onChange={event => {
									handleTechStackSelection(event.target.checked ? 'UXUI' : '');
									setIsTechStackSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='uxui'>
								UX/UI
							</label>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TechStackSelector;
