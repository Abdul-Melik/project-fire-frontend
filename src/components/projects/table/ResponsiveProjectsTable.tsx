import { useContext, useState } from 'react';
import axios from 'axios';

import TableHeader from 'src/shared/components/table-elements/TableHeader';
import TableHead from 'src/shared/components/table-elements/TableHead';
import TableRow from 'src/shared/components/table-elements/TableRow';
import { toast } from 'react-toastify';
import DataCard from 'src/shared/components/cards/DataCard';
import PlanCardItem from 'src/components/home/plan/PlanCardItem';
import arrow from 'src/assets/media/svg/arrow.svg';
import React from 'react';

type ProjectType = 'Fixed' | 'OnGoing';
type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';
type ProjectStatus = 'Active' | 'OnHold' | 'Inactive' | 'Completed';

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
	department: string;
	salary: number;
	techStack: string[];
};

type EmployeesPerProject = {
	partTime: boolean;
	employee: Employee;
};

type Project = {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	actualEndDate: string;
	projectType: ProjectType;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: SalesChannel;
	projectStatus: ProjectStatus;
	employees: EmployeesPerProject[];
};

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
};

const getProjectDate = (project: Project) => {
	const startDate = new Date(project.startDate);
	const endDate = new Date(project.endDate);
	const startDateString = startDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	const endDateString = endDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	return { startDateString, endDateString };
};

const getProjectValueBAM = (project: Project) => {
	return project.projectValueBAM.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

const getProjectColorAndStatus = (project: Project) => {
	const projectStatus = project.projectStatus;
	if (projectStatus === 'Active') return { color: 'bg-spring-fern', status: 'Active' };
	else if (projectStatus === 'OnHold') return { color: 'bg-golden-tangerine', status: 'On hold' };
	else if (projectStatus === 'Inactive') return { color: 'bg-silver-mist', status: 'Inactive' };
	else return { color: 'bg-cerulean-breeze', status: 'Completed' };
};

const ResponsiveProjectsTable = ({
	totalNumberOfProjects,
	projects,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
}: Props) => {
	const [selectedProject, setSelectedProject] = useState<string>('');

	const columns = [
		{ name: 'Name', label: 'name' },
		{ name: 'Status', label: 'projectStatus' },
	];

	const selectProject = (projectId: string) => {
		selectedProject === projectId ? setSelectedProject('') : setSelectedProject(projectId);
	};

	return (
		<div className='w-full rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='Projects Table' total={totalNumberOfProjects} value={value} handleSearch={handleSearch} />
			<div className='table-responsive'>
				<table className='w-full border-t border-ashen-grey'>
					<TableHead
						columns={columns}
						orderByField={orderByField}
						orderDirection={orderDirection}
						handleSort={handleSort}
					/>
					<tbody>
						{projects.map(project => {
							const projectId = project.id;
							return (
								<React.Fragment key={projectId}>
									<TableRow className='hover:cursor-pointer hover:bg-white' onClick={() => selectProject(projectId)}>
										<td className='pl-4'>
											<div className='flex w-3/5 items-center justify-between font-gilroy-regular text-[16px] leading-6 text-deep-forest'>
												<p>{project.name}</p>
											</div>
										</td>
										<td className='flex h-[60px] items-center gap-2 pl-4'>
											<div className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project).color}`} />
											<div className='font-gilroy-semi-bold font-semibold'>
												{getProjectColorAndStatus(project).status}
											</div>
										</td>
									</TableRow>
									{projectId === selectedProject && (
										<tr className='ml-[10%]'>
											<td colSpan={2}>
												<div className='ml-[5%] mt-[11px] flex w-[90%] flex-col gap-[5px] !text-[15px]'>
													<PlanCardItem
														text='Duration'
														amount={`${getProjectDate(project).startDateString} - ${
															getProjectDate(project).endDateString
														}`}
													/>
													<PlanCardItem text='Developers' amount={project.employees.length.toString()} />
													<PlanCardItem text='Hourly Rate' amount={'$' + project.hourlyRate.toString()} />
													<PlanCardItem text='Project Value' amount={project.projectValueBAM.toString() + ' BAM'} />
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ResponsiveProjectsTable;
