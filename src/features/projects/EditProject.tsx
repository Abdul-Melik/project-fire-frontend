import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Employees, Project } from 'src/types';
import { useUpdateProjectMutation } from 'store/slices/projectsApiSlice';
import BackButton from 'components/utils/BackButton';
import InputField from 'components/formElements/InputField';
import DateInputs from 'components/formElements/DateInputs';
import EmployeesSelector from 'components/selectors/EmployeesSelector';
import ProjectStatusSelector from 'components/selectors/ProjectStatusSelector';
import SideDrawer from 'components/navigation/SideDrawer';
import Header from 'components/layout/Header';
import Main from 'components/layout/Main';
import Footer from 'components/layout/Footer';

type Props = {
	project: Project;
	closeEditProjectSideDrawer: () => void;
};

const EditProject = ({ project, closeEditProjectSideDrawer }: Props) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().getFullYear(), 0, 1));
	const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().getFullYear(), 11, 31));
	const [projectType, setProjectType] = useState('Fixed');
	const [hourlyRate, setHourlyRate] = useState('');
	const [projectValueBAM, setProjectValueBAM] = useState('');
	const [salesChannel, setSalesChannel] = useState('Online');
	const [selectedProjectStatus, setSelectedProjectStatus] = useState('');
	const [selectedEmployees, setSelectedEmployees] = useState<Employees[]>([]);

	const [updateProject, { isSuccess }] = useUpdateProjectMutation();

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
			setSelectedProjectStatus(project.projectStatus);
			setSelectedEmployees(project.employees);
		}
	}, [project]);

	const editProject = async (event: React.MouseEvent<HTMLElement>) => {
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
			projectStatus: selectedProjectStatus,
			employees,
		};
		await updateProject({ projectId: project.id, data });
	};

	useEffect(() => {
		if (isSuccess) closeEditProjectSideDrawer();
	}, [isSuccess]);

	const children = (
		<motion.div
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			className='fixed right-0 top-0 z-20 flex min-h-full w-[496px] flex-col bg-frosty-mint px-6 pt-[27px]'
		>
			<Header className='flex flex-col gap-[13px]'>
				<BackButton closeSideDrawer={closeEditProjectSideDrawer} />
				<h2 className='rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
					Edit Project
				</h2>
			</Header>
			<Main className='rounded-lg bg-white p-6'>
				<form className='flex flex-col gap-4'>
					<InputField
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
						required
						type='text'
						label='Name'
						htmlFor='name'
						id='name'
						name='name'
						placeholder='Project name'
						value={name}
						handleInput={name => setName(name)}
					/>
					<InputField
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
						required
						type='text'
						label='Description'
						htmlFor='description'
						id='description'
						name='description'
						placeholder='Project description'
						value={description}
						handleInput={description => setDescription(description)}
					/>
					<DateInputs
						startDate={startDate}
						endDate={endDate}
						handleStartDateInput={startDate => setStartDate(startDate)}
						handleEndDateInput={endDate => setEndDate(endDate)}
					/>
					<EmployeesSelector
						selectedEmployees={selectedEmployees}
						handleEmployeesSelection={employees => {
							setSelectedEmployees(employees);
						}}
					/>
					<InputField
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputContainerClassName='flex gap-2 w-full'
						inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
						required
						type='number'
						label='Hourly Rate'
						htmlFor='hourlyRate'
						id='hourlyRate'
						name='hourlyRate'
						min={0}
						step={0.01}
						placeholder='Enter the amount'
						value={hourlyRate}
						handleInput={hourlyRate => setHourlyRate(hourlyRate)}
					/>
					<InputField
						containerClassName='gap-1'
						labelClassName='leading-[22px]'
						inputContainerClassName='flex gap-2 w-full'
						inputClassName='border-misty-moonstone px-4 py-2 text-sm leading-[22px] text-slate-mist focus:border-misty-moonstone'
						required
						type='number'
						label='Project Value (BAM)'
						htmlFor='projectValueBAM'
						id='projectValueBAM'
						name='projectValueBAM'
						min={0}
						step={0.01}
						placeholder='Enter the amount in BAM'
						value={projectValueBAM}
						handleInput={projectValueBAM => setProjectValueBAM(projectValueBAM)}
					/>
					<ProjectStatusSelector
						selectedProjectStatus={selectedProjectStatus}
						handleProjectStatusSelection={projectStatus => setSelectedProjectStatus(projectStatus)}
					/>
				</form>
			</Main>
			<Footer
				firstButtonClassName='border border-deep-teal text-evergreen'
				secondButtonClassName='bg-deep-teal text-white'
				firstButtonText='Cancel'
				secondButtonText='Edit Project'
				handleFirstButtonClick={closeEditProjectSideDrawer}
				handleSecondButtonClick={editProject}
			/>
		</motion.div>
	);

	return <SideDrawer onClick={closeEditProjectSideDrawer}>{children}</SideDrawer>;
};

export default EditProject;
