import { useEffect, useState } from 'react';
import { useDeleteProjectMutation } from 'store/slices/projectsApiSlice';

import TableHeader from 'src/components/tableElements/TableHeader';
import TableHead from 'src/components/tableElements/TableHead';
import TableRow from 'src/components/tableElements/TableRow';

import PlanCardItem from 'src/features/home/PlanCardItem';

import React from 'react';
import ViewProject from './ViewProject';
import EditProject from './EditProject';
import AlertModal from 'src/components/modals/AlertModal';

import { Employee } from 'src/types';
import { Project } from 'src/types';
import { getEmployeeNamesAndImages, getProjectDate, getProjectValueBAM, getProjectColorAndStatus } from 'src/helpers';

type ProjectType = 'Fixed' | 'OnGoing';
type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';
type ProjectStatus = 'Active' | 'OnHold' | 'Inactive' | 'Completed';
type Department = 'Administration' | 'Management' | 'Development' | 'Design';
type Currency = 'USD' | 'EUR' | 'BAM';
type TechStack = 'AdminNA' | 'MgmtNA' | 'FullStack' | 'Frontend' | 'Backend' | 'UXUI';

type EmployeesPerProject = {
	partTime: boolean;
	employee: Employee;
};

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
	project: Project;
	closeViewProjectSideDrawer: () => void;
};

const ResponsiveProjectsTable = ({
	totalNumberOfProjects,
	projects,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
	closeViewProjectSideDrawer,
	project,
}: Props) => {
	const [selectedProject, setSelectedProject] = useState<string>('');
	const [isViewProjectSideDrawerOpen, setIsViewProjectSideDrawerOpen] = useState(false);
	const [isEditProjectSideDrawerOpen, setIsEditProjectSideDrawerOpen] = useState(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

	const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

	const columns = [
		{ name: 'Name', label: 'name' },
		{ name: 'Status', label: 'projectStatus' },
	];

	const selectProject = (projectId: string) => {
		selectedProject === projectId ? setSelectedProject('') : setSelectedProject(projectId);
	};

	const onConfirm = async () => {
		await deleteProject({ projectId: project.id });
	};

	useEffect(() => {
		if (isSuccess) {
			setIsAlertModalOpen(false);
			closeViewProjectSideDrawer();
		}
	}, [isSuccess]);

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
											<div
												className={`h-[6px] w-[6px] rounded-full ${
													getProjectColorAndStatus(project.projectStatus)?.color
												}`}
											/>
											<div className='font-gilroy-semi-bold font-semibold'>
												{getProjectColorAndStatus(project.projectStatus)?.status}
											</div>
										</td>
									</TableRow>
									{projectId === selectedProject && (
										<tr className='ml-[10%]'>
											<td colSpan={2}>
												<div className='ml-[5%] mt-[11px] flex w-[90%] flex-col gap-[5px] !text-[15px]'>
													<PlanCardItem text='Duration' amount={getProjectDate(project.startDate, project.endDate)} />
													<PlanCardItem text='Developers' amount={project.employees.length.toString()} />
													<PlanCardItem text='Hourly Rate' amount={'$' + project.hourlyRate.toString()} />
													<PlanCardItem text='Project Value' amount={project.projectValueBAM.toString() + ' BAM'} />

													{isViewProjectSideDrawerOpen && (
														<ViewProject
															project={project}
															closeViewProjectSideDrawer={() => setIsViewProjectSideDrawerOpen(false)}
															openEditProjectSideDrawer={() => setIsEditProjectSideDrawerOpen(true)}
														/>
													)}
													{isEditProjectSideDrawerOpen && (
														<EditProject
															project={project}
															closeEditProjectSideDrawer={() => setIsEditProjectSideDrawerOpen(false)}
														/>
													)}
													{isAlertModalOpen && (
														<AlertModal
															alertTitle={`Are you sure you want to delete ${project.name}?`}
															alertDescription={`This will permanently delete ${project.name} and all associated data. You cannot undo this action.`}
															cancelButtonText="Don't Delete"
															confirmButtonText='Delete'
															confirmButtoncolor='#FF4D4F'
															onCancel={() => setIsAlertModalOpen(false)}
															onConfirm={onConfirm}
														/>
													)}
													<button
														className='mb-4 rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
														onClick={() => {
															setIsViewProjectSideDrawerOpen(true);
														}}
													>
														Project info
													</button>
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
