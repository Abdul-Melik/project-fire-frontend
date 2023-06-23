import { useState, useLayoutEffect, useRef } from 'react';

import { chevronDown } from 'assets/media';

type Props = {
	department: string;
	handleDepartmentSelection: (department: string) => void;
};

const DepartmentSelector = ({ department, handleDepartmentSelection }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [isDepartmentSelectorOpen, setIsDepartmentSelectorOpen] = useState(false);

	useLayoutEffect(() => {
		setWidth(ref.current?.offsetWidth ?? 0);
		setHeight(ref.current?.offsetHeight ?? 0);
	}, [ref]);

	return (
		<div className='flex flex-col gap-1'>
			<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Department</span>
			<div ref={ref} className='relative rounded-md border border-misty-moonstone px-4 py-2'>
				<div
					className='flex cursor-pointer items-center justify-between'
					onClick={() => setIsDepartmentSelectorOpen(!isDepartmentSelectorOpen)}
				>
					<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
						{!department ? 'Select employee department' : department}
					</span>
					<img
						className={`transition ${isDepartmentSelectorOpen ? 'rotate-180' : ''}`}
						src={chevronDown}
						alt='Down icon'
					/>
				</div>
				{isDepartmentSelectorOpen && (
					<div
						className='absolute left-0 z-20 flex flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'
						style={{ width, top: height }}
					>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='checkbox'
								id='administration'
								name='administration'
								checked={department === 'Administration'}
								onChange={event => {
									handleDepartmentSelection(event.target.checked ? 'Administration' : '');
									setIsDepartmentSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='administration'>
								Administration
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen  focus:ring-transparent'
								type='checkbox'
								id='management'
								name='management'
								checked={department === 'Management'}
								onChange={event => {
									handleDepartmentSelection(event.target.checked ? 'Management' : '');
									setIsDepartmentSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='management'>
								Management
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
								type='checkbox'
								id='development'
								name='development'
								checked={department === 'Development'}
								onChange={event => {
									handleDepartmentSelection(event.target.checked ? 'Development' : '');
									setIsDepartmentSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='development'>
								Development
							</label>
						</div>
						<div className='flex items-center gap-2 px-4 py-1'>
							<input
								className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen  focus:ring-transparent'
								type='checkbox'
								id='design'
								name='design'
								checked={department === 'Design'}
								onChange={event => {
									handleDepartmentSelection(event.target.checked ? 'Design' : '');
									setIsDepartmentSelectorOpen(false);
								}}
							/>
							<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='design'>
								Design
							</label>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DepartmentSelector;
