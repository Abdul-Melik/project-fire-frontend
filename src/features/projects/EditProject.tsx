import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

import { Employee, Employees, Project, ProjectStatus } from 'src/types';
import { getProjectColorAndStatus } from 'src/helpers';
import { chevronDown, chevronLeft, date, cancel } from 'assets/media';
import { useGetEmployeesQuery } from 'store/slices/employeesApiSlice';
import { useUpdateProjectMutation } from 'store/slices/projectsApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import SideDrawer from 'components/navigation/SideDrawer';

type Props = {
	project: Project;
	closeEditProjectSideDrawer: () => void;
};

const EditProject = ({ project, closeEditProjectSideDrawer }: Props) => {
	const [isEmployeesMenuOpen, setIsEmployeesMenuOpen] = useState(false);
	const [isProjectStatusMenuOpen, setIsProjectStatusMenuOpen] = useState(false);
	const [openPartTimeMenus, setOpenPartTimeMenus] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().getFullYear(), 0, 1));
	const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().getFullYear(), 11, 31));
	const [projectType, setProjectType] = useState('Fixed');
	const [hourlyRate, setHourlyRate] = useState('');
	const [projectValueBAM, setProjectValueBAM] = useState('');
	const [salesChannel, setSalesChannel] = useState('Online');
	const [projectStatus, setProjectStatus] = useState('');
	const [selectedEmployees, setSelectedEmployees] = useState<Employees[]>([]);

	const {
		isLoading,
		isFetching,
		isSuccess: isEmployeesSuccess,
		data,
	} = useGetEmployeesQuery(
		{
			searchTerm: '',
			isEmployed: 'true',
			orderByField: '',
			orderDirection: '',
			employeesPerPage: '',
			currentPage: '',
		},
		{
			pollingInterval: 60000,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		}
	);
	const [updateProject, { isSuccess: isUpdateSuccess }] = useUpdateProjectMutation();

	useEffect(() => {
		if (project) {
			setName(project.name);
			setDescription(project.description);
			setStartDate(new Date(project.startDate));
			setEndDate(new Date(project.endDate));
			setProjectType(project.projectType);
			setHourlyRate(project.hourlyRate.toString());
			setProjectValueBAM(project.projectValueBAM.toString());
			setSalesChannel(project.salesChannel);
			setProjectStatus(project.projectStatus);
			setSelectedEmployees(project.employees);
		}
	}, [project]);

	const handleUpdate = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const employees = selectedEmployees.map(({ partTime, employee }) => ({
			partTime,
			employeeId: employee.id,
		}));
		const data = {
			name,
			description,
			startDate,
			endDate,
			projectType,
			hourlyRate: Number(hourlyRate),
			projectValueBAM: Number(projectValueBAM),
			salesChannel,
			projectStatus,
			employees,
		};
		await updateProject({ projectId: project.id, data });
	};

	useEffect(() => {
		if (isUpdateSuccess) closeEditProjectSideDrawer();
	}, [isUpdateSuccess]);

	const CustomDateInput = forwardRef<HTMLDivElement>(
		(
			{
				value,
				onClick,
			}: {
				value?: any;
				onClick?: any;
			},
			ref
		) => (
			<div
				className='flex w-[175px] items-center rounded-md border border-misty-moonstone px-3 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist hover:cursor-pointer focus:border-misty-moonstone focus:ring-transparent'
				onClick={onClick}
				ref={ref}
			>
				<span className='flex-1'>{value}</span>
				<img src={date} alt='Date icon' />
			</div>
		)
	);

	const children = (
		<motion.div
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			className='fixed right-0 top-0 z-20 flex min-h-full w-[496px] flex-col bg-frosty-mint px-6 pt-[27px]'
		>
			<header className='flex flex-col gap-[13px]'>
				<div className='flex cursor-pointer items-center gap-[3px]' onClick={closeEditProjectSideDrawer}>
					<img className='h-4 w-4' src={chevronLeft} alt='Back icon' />
					<span className='font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen'>Back</span>
				</div>
				<h2 className='rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
					Edit Project
				</h2>
			</header>
			<main className='mt-4 rounded-lg bg-white p-6'>
				<form className='flex flex-col gap-4'>
					<div className='flex flex-col gap-1'>
						<label
							className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'
							htmlFor='name'
						>
							Name
						</label>
						<input
							className='rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
							required
							type='text'
							id='name'
							name='name'
							placeholder='Project name'
							autoComplete='off'
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label
							className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'
							htmlFor='description'
						>
							Description
						</label>
						<input
							className='rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
							required
							type='text'
							id='description'
							name='description'
							placeholder='Project description'
							autoComplete='off'
							value={description}
							onChange={event => setDescription(event.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
							Hourly Rate
						</span>
						<div className='flex gap-2'>
							<input
								className='flex-1 rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
								required
								type='number'
								id='hourlyRate'
								name='hourlyRate'
								min={0}
								step={0.01}
								placeholder='Enter the amount'
								value={hourlyRate}
								onChange={event => setHourlyRate(event.target.value)}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<label
							className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'
							htmlFor='projectValueBAM'
						>
							Project Value (BAM)
						</label>
						<input
							className='flex-1 rounded-md border border-misty-moonstone px-4 py-2 font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist focus:border-misty-moonstone focus:ring-transparent'
							required
							type='number'
							id='projectValueBAM'
							name='projectValueBAM'
							min={0}
							step={0.01}
							placeholder='Enter the amount in BAM'
							value={projectValueBAM}
							onChange={event => setProjectValueBAM(event.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Duration</span>
						<div className='flex w-full items-center gap-4'>
							<div>
								<DatePicker
									required
									customInput={<CustomDateInput />}
									placeholderText={startDate?.toLocaleDateString('en-US', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
									})}
									selected={startDate}
									onChange={date => setStartDate(date)}
								/>
							</div>
							<span className='font-gilroy-regular text-lg font-normal leading-6 text-black'>to</span>
							<div>
								<DatePicker
									required
									customInput={<CustomDateInput />}
									placeholderText={endDate?.toLocaleDateString('en-US', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
									})}
									selected={endDate}
									onChange={date => setEndDate(date)}
								/>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
							Assign developers
						</span>
						<div className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
							<div
								className='flex cursor-pointer items-center justify-between'
								onClick={() => setIsEmployeesMenuOpen(!isEmployeesMenuOpen)}
							>
								<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
									Select team members working on this project
								</span>
								<img
									className={`transition ${isEmployeesMenuOpen ? 'rotate-180' : ''}`}
									src={chevronDown}
									alt='Down icon'
								/>
							</div>
							{isEmployeesMenuOpen && (
								<div className='absolute left-0 top-10 z-20 flex max-h-[128px] w-[400px] flex-col overflow-y-scroll rounded-md border border-t-0 border-misty-moonstone bg-white py-2 scrollbar-thin scrollbar-track-ashen-grey scrollbar-thumb-misty-moonstone scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
									{isLoading || isFetching ? (
										<LoadingSpinner size={50} />
									) : (
										isEmployeesSuccess &&
										data.employees.map((employee: Employee, index: number) => (
											<div key={employee.id} className='flex items-center gap-2 px-4 py-1'>
												<input
													className='h-[15px] w-[15px] appearance-none rounded-sm border-2 border-slate-mist text-evergreen focus:ring-transparent'
													type='checkbox'
													id={`employee${index + 1}`}
													name={`employee${index + 1}`}
													checked={selectedEmployees.some(
														selectedEmployee => selectedEmployee.employee.id === employee.id
													)}
													onChange={event => {
														setSelectedEmployees(
															event.target.checked
																? [...selectedEmployees, { partTime: false, employee }]
																: selectedEmployees.filter(
																		selectedEmployee => selectedEmployee.employee.id !== employee.id
																  )
														);
														setOpenPartTimeMenus(
															!event.target.checked
																? openPartTimeMenus.filter(employeeId => employeeId !== employee.id)
																: openPartTimeMenus
														);
													}}
												/>
												<label
													className='font-gilroy-regular text-sm font-normal text-slate-mist'
													htmlFor='administration'
												>
													{employee.firstName + ' ' + employee.lastName}
												</label>
											</div>
										))
									)}
								</div>
							)}
						</div>
						{!isEmployeesMenuOpen && selectedEmployees.length > 0 && (
							<div className='flex max-h-[154px] flex-col overflow-y-scroll p-4 scrollbar-thin scrollbar-track-ashen-grey scrollbar-thumb-misty-moonstone scrollbar-track-rounded-full scrollbar-thumb-rounded-full'>
								{selectedEmployees.map(({ partTime, employee }, index: number) => (
									<div
										key={employee.id}
										className={`flex items-center justify-between gap-2 ${
											index < selectedEmployees.length - 1 ? 'border-b border-ashen-grey pb-3' : ''
										} ${index > 0 ? 'pt-3' : ''}`}
									>
										<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-inky-twilight'>
											{employee.firstName + ' ' + employee.lastName}
										</span>
										<div className='flex items-center gap-[10px]'>
											<div className='relative min-w-[90px] rounded-md border border-misty-moonstone px-2 py-1 focus:outline-none'>
												<div
													className='flex cursor-pointer items-center justify-between gap-2'
													onClick={() =>
														setOpenPartTimeMenus(
															openPartTimeMenus.includes(employee.id)
																? openPartTimeMenus.filter(employeeId => employeeId !== employee.id)
																: [...openPartTimeMenus, employee.id]
														)
													}
												>
													{openPartTimeMenus.includes(employee.id) && (
														<div className='flex items-center gap-2'>
															<div
																className='rounded-md px-2 font-gilroy-regular text-xs font-normal text-evergreen hover:bg-misty-moonstone'
																onClick={() => {
																	setOpenPartTimeMenus(
																		openPartTimeMenus.filter(employeeId => employeeId !== employee.id)
																	);
																	setSelectedEmployees(
																		selectedEmployees.map(selectedEmployee =>
																			selectedEmployee.employee.id === employee.id
																				? { partTime: false, employee }
																				: selectedEmployee
																		)
																	);
																}}
															>
																Full time
															</div>
															<div
																className='rounded-md px-2 font-gilroy-regular text-xs font-normal text-evergreen hover:bg-misty-moonstone'
																onClick={() => {
																	[...openPartTimeMenus, employee.id];
																	setSelectedEmployees(
																		selectedEmployees.map(selectedEmployee =>
																			selectedEmployee.employee.id === employee.id
																				? { partTime: true, employee }
																				: selectedEmployee
																		)
																	);
																}}
															>
																Part time
															</div>
														</div>
													)}
													<span className='font-gilroy-regular text-xs font-normal text-evergreen'>
														{!openPartTimeMenus.includes(employee.id) ? (!partTime ? 'Full time' : 'Part time') : ''}
													</span>
													<img
														className={`transition ${
															openPartTimeMenus.find(employeeId => employeeId === employee.id) ? 'rotate-180' : ''
														}`}
														src={chevronDown}
														alt='Down icon'
													/>
												</div>
											</div>
											<img
												className='transition hover:scale-125 hover:cursor-pointer'
												src={cancel}
												alt='Cancel icon'
												onClick={() => {
													setSelectedEmployees(
														selectedEmployees.filter(
															({ employee: selectedEmployee }) => selectedEmployee.id !== employee.id
														)
													);
													setOpenPartTimeMenus(openPartTimeMenus.filter(employeeId => employeeId !== employee.id));
												}}
											/>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<div className='flex flex-col gap-1'>
						<span className='font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>Status</span>
						<div className='relative rounded-md border border-misty-moonstone px-4 py-2 focus:outline-none'>
							<div
								className='flex cursor-pointer items-center justify-between'
								onClick={() => setIsProjectStatusMenuOpen(!isProjectStatusMenuOpen)}
							>
								<span className='font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
									{projectStatus
										? getProjectColorAndStatus(projectStatus as ProjectStatus)?.status
										: 'Select project status'}
								</span>
								<img
									className={`transition ${isProjectStatusMenuOpen ? 'rotate-180' : ''}`}
									src={chevronDown}
									alt='Down icon'
								/>
							</div>
							{isProjectStatusMenuOpen && (
								<div className='absolute left-0 top-10 z-20 flex max-h-[128px] w-[400px] flex-col rounded-md border border-t-0 border-misty-moonstone bg-white py-2'>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen focus:ring-transparent'
											type='radio'
											id='active'
											name='active'
											checked={projectStatus === 'Active'}
											onChange={event => {
												setProjectStatus(event.target.checked ? 'Active' : '');
												setIsProjectStatusMenuOpen(false);
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
											checked={projectStatus === 'OnHold'}
											onChange={event => {
												setProjectStatus(event.target.checked ? 'OnHold' : '');
												setIsProjectStatusMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='fullstack'>
											On hold
										</label>
									</div>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen  focus:ring-transparent'
											type='radio'
											id='inactive'
											name='inactive'
											checked={projectStatus === 'Inactive'}
											onChange={event => {
												setProjectStatus(event.target.checked ? 'Inactive' : '');
												setIsProjectStatusMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='backend'>
											Inactive
										</label>
									</div>
									<div className='flex items-center gap-2 px-4 py-1'>
										<input
											className='h-[15px] w-[15px] appearance-none border-2 border-slate-mist text-evergreen focus:ring-transparent'
											type='radio'
											id='completed'
											name='completed'
											checked={projectStatus === 'Completed'}
											onChange={event => {
												setProjectStatus(event.target.checked ? 'Completed' : '');
												setIsProjectStatusMenuOpen(false);
											}}
										/>
										<label className='font-gilroy-regular text-sm font-normal text-slate-mist' htmlFor='frontend'>
											Completed
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
					onClick={closeEditProjectSideDrawer}
				>
					Cancel
				</button>
				<button
					className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white'
					onClick={handleUpdate}
				>
					Edit Project
				</button>
			</footer>
		</motion.div>
	);

	return <SideDrawer onClick={closeEditProjectSideDrawer}>{children}</SideDrawer>;
};

export default EditProject;
