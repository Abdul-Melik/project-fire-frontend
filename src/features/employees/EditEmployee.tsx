import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

import { Employee } from 'src/types';
import { getEmployeeTechStack } from 'src/helpers';
import { chevronDown, chevronLeft, plus } from 'assets/media';
import { useUpdateEmployeeMutation } from 'store/slices/employeesApiSlice';
import SideDrawer from 'components/navigation/SideDrawer';

type Props = {
	employee: Employee;
	closeEditEmployeeSideDrawer: () => void;
};

const EditEmployee = ({ employee, closeEditEmployeeSideDrawer }: Props) => {
	const [isDepartmentMenuOpen, setIsDepartmentMenuOpen] = useState(false);
	const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
	const [isTechStackMenuOpen, setIsTechStackMenuOpen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [image, setImage] = useState<File | undefined>();
	const [department, setDepartment] = useState('');
	const [salary, setSalary] = useState('');
	const [techStack, setTechStack] = useState('');

	const [updateEmployee, { isSuccess }] = useUpdateEmployeeMutation();

	const fetchImage = useCallback(async () => {
		if (employee?.image) {
			const response = await fetch(employee.image);
			const blob = await response.blob();
			const imageFile = new File([blob], 'profile-image.jpg', { type: 'image/jpeg' });
			setImage(imageFile);
		}
	}, [employee]);

	useEffect(() => {
		if (employee) {
			setFirstName(employee.firstName);
			setLastName(employee.lastName);
			setDepartment(employee.department);
			setSalary(employee.salary.toString());
			setTechStack(employee.techStack);
			fetchImage();
		}
	}, [employee]);

	const handleUpdate = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		if (image) formData.append('image', image);
		formData.append('department', department);
		formData.append('salary', salary);
		formData.append('techStack', techStack);
		await updateEmployee({ employeeId: employee.id, data: formData });
	};

	useEffect(() => {
		if (isSuccess) closeEditEmployeeSideDrawer();
	}, [isSuccess]);

	useEffect(() => {
		if (!isSuccess) {
			if (department === 'Administration' && techStack === 'MgmtNA') setTechStack('AdminNA');
			else if (department === 'Management' && techStack === 'AdminNA') setTechStack('MgmtNA');
		}
	}, [department]);

	const children = (
		<motion.div
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			className='fixed right-0 top-0 z-20 flex min-h-full w-[496px] flex-col bg-frosty-mint px-6 pt-[27px]'
		>
			<div className='flex cursor-pointer items-center gap-[3px]' onClick={closeEditEmployeeSideDrawer}>
				<img className='h-4 w-4' src={chevronLeft} alt='Back icon' />
				<span className='font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen'>Back</span>
			</div>
			{employee && (
				<>
					<header className='mt-[13px]'>
						<h2 className='rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
							Edit Employee
						</h2>
					</header>
					<main className='mt-4 rounded-lg bg-white p-6'>
						<form className='flex flex-col gap-4'>
							<div className='flex flex-col'>
								<label
									className='pb-1 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'
									htmlFor='firstName'
								>
									First Name
								</label>
								<input
									className='rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
									type='text'
									id='firstName'
									name='firstName'
									placeholder='First Name'
									autoComplete='off'
									value={firstName}
									onChange={event => setFirstName(event.target.value)}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='pb-1 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'
									htmlFor='lastName'
								>
									Last Name
								</label>
								<input
									className='rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
									type='text'
									id='lastName'
									name='lastName'
									placeholder='Last Name'
									value={lastName}
									onChange={event => setLastName(event.target.value)}
								/>
							</div>
							<div className='flex flex-col'>
								<span className='pb-1 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
									Profile Image
								</span>
								<label
									className='flex h-[104px] w-[104px] cursor-pointer flex-col items-center justify-center gap-[10px] overflow-hidden rounded-md border border-dashed border-ashen-grey bg-frosty-mint'
									htmlFor='profileImage'
								>
									{!image ? (
										<>
											<img className='h-[14px] w-[14px]' src={plus} alt='Upload icon' />
											<span className='font-gilroy-regular text-sm font-normal leading-6 text-evergreen'>Upload</span>
										</>
									) : (
										<img className='h-full w-full object-cover' src={URL.createObjectURL(image)} alt='Profile image' />
									)}
									<input
										className='hidden'
										type='file'
										accept='image/*'
										id='profileImage'
										name='profileImage'
										onChange={event => {
											const file = event.target.files?.[0];
											if (file) {
												setImage(file);
											}
										}}
									/>
								</label>
							</div>
							<div className='flex flex-col'>
								<span className='pb-1 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
									Department
								</span>
								<div className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
									<div
										className='flex cursor-pointer items-center justify-between'
										onClick={() => setIsDepartmentMenuOpen(!isDepartmentMenuOpen)}
									>
										<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
											{!department ? 'Select employee department' : department}
										</span>
										<img
											className={`transition ${isDepartmentMenuOpen ? 'rotate-180' : ''}`}
											src={chevronDown}
											alt='Down icon'
										/>
									</div>
									{isDepartmentMenuOpen && (
										<div className='absolute left-0 top-10 z-10 flex w-[400px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'>
											<div className='flex items-center gap-2 px-4 py-1'>
												<input
													className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
													type='checkbox'
													id='administration'
													name='administration'
													checked={department === 'Administration'}
													onChange={event => {
														setDepartment(event.target.checked ? 'Administration' : '');
														setIsDepartmentMenuOpen(false);
													}}
												/>
												<label
													className='font-gilroy-regular text-sm font-normal text-slate-mist'
													htmlFor='administration'
												>
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
														setDepartment(event.target.checked ? 'Management' : '');
														setIsDepartmentMenuOpen(false);
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
														setDepartment(event.target.checked ? 'Development' : '');
														setIsDepartmentMenuOpen(false);
													}}
												/>
												<label
													className='font-gilroy-regular text-sm font-normal text-slate-mist'
													htmlFor='development'
												>
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
														setDepartment(event.target.checked ? 'Design' : '');
														setIsDepartmentMenuOpen(false);
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
							<div className='flex flex-col'>
								<span className='pb-1 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
									Monthly Salary
								</span>
								<div className='flex gap-2'>
									<input
										className='flex-1 rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
										type='number'
										id='salary'
										name='salary'
										min={0}
										step={0.01}
										placeholder='Enter the amount'
										value={salary}
										onChange={event => setSalary(event.target.value)}
									/>
									<div
										className='relative flex cursor-pointer items-center justify-between gap-2 rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'
										onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
									>
										<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>BAM</span>
										<img
											className={`transition ${isCurrencyMenuOpen ? 'rotate-180' : ''}`}
											src={chevronDown}
											alt='Down icon'
										/>
									</div>
								</div>
							</div>
							<div className='flex flex-col'>
								<span className='pb-1 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
									Tech Stack
								</span>
								<div className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
									<div
										className='flex cursor-pointer items-center justify-between'
										onClick={() => setIsTechStackMenuOpen(!isTechStackMenuOpen)}
									>
										<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
											{!techStack ? 'Select stack' : getEmployeeTechStack(employee.techStack)}
										</span>
										<img
											className={`transition ${isTechStackMenuOpen ? 'rotate-180' : ''}`}
											src={chevronDown}
											alt='Down icon'
										/>
									</div>
									{isTechStackMenuOpen && (
										<div className='absolute left-0 top-10 flex w-[400px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'>
											<div className='flex items-center gap-2 px-4 py-1'>
												<input
													className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
													type='checkbox'
													id='na'
													name='na'
													checked={techStack === 'AdminNA' || techStack === 'MgmtNA'}
													onChange={event => {
														setTechStack(
															event.target.checked ? (department === 'Administration' ? 'AdminNA' : 'MgmtNA') : ''
														);
														setIsTechStackMenuOpen(false);
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
														setTechStack(event.target.checked ? 'FullStack' : '');
														setIsTechStackMenuOpen(false);
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
														setTechStack(event.target.checked ? 'Backend' : '');
														setIsTechStackMenuOpen(false);
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
														setTechStack(event.target.checked ? 'Frontend' : '');
														setIsTechStackMenuOpen(false);
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
														setTechStack(event.target.checked ? 'UXUI' : '');
														setIsTechStackMenuOpen(false);
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
						</form>
					</main>
					<footer className='absolute bottom-0 left-0 flex w-full items-center justify-end gap-2 bg-white p-6'>
						<button
							className='rounded-md border border-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen'
							onClick={closeEditEmployeeSideDrawer}
						>
							Cancel
						</button>
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white'
							onClick={handleUpdate}
						>
							Edit Employee
						</button>
					</footer>
				</>
			)}
		</motion.div>
	);

	return <SideDrawer onClick={closeEditEmployeeSideDrawer}>{children}</SideDrawer>;
};

export default EditEmployee;
