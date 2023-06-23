import { useState, useLayoutEffect, useRef } from 'react';

import { TechStack } from 'src/types';
import { getEmployeeTechStack } from 'src/helpers';
import { chevronDown } from 'assets/media';

type Props = {
	department: string;
	techStack: string;
	handleTechStackSelection: (techStack: string) => void;
};

const TechStackSelector = ({ department, techStack, handleTechStackSelection }: Props) => {
	const [isTechStackSelectorOpen, setIsTechStackSelectorOpen] = useState(false);

	return (
		<div className='flex flex-col gap-1'>
			<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Tech Stack</span>
			<div className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
				<div
					className='flex cursor-pointer items-center justify-between'
					onClick={() => setIsTechStackSelectorOpen(!isTechStackSelectorOpen)}
				>
					<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
						{!techStack ? 'Select stack' : getEmployeeTechStack(techStack as TechStack)}
					</span>
					<img
						className={`transition ${isTechStackSelectorOpen ? 'rotate-180' : ''}`}
						src={chevronDown}
						alt='Down icon'
					/>
				</div>
				{isTechStackSelectorOpen && (
					<div className='absolute left-0 top-10 flex w-[400px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='checkbox'
								id='na'
								name='na'
								checked={techStack === 'AdminNA' || techStack === 'MgmtNA'}
								onChange={event => {
									handleTechStackSelection(
										event.target.checked ? (department === 'Administration' ? 'AdminNA' : 'MgmtNA') : ''
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
								checked={techStack === 'FullStack'}
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
								checked={techStack === 'Backend'}
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
								checked={techStack === 'Frontend'}
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
								checked={techStack === 'UXUI'}
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
