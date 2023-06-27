import { useContext, useState } from 'react';
import axios from 'axios';

import TableHeader from 'src/components/tableElements/TableHeader';
import TableHead from 'src/components/tableElements/TableHead';
import TableRow from 'src/components/tableElements/TableRow';
import DataCard from 'src/components/cards/DataCard';
import PlanCardItem from 'src/features/home/PlanCardItem';
import arrow from 'src/assets/media/svg/arrow.svg';
import React from 'react';
import { Project } from 'src/types';
import { Employee } from 'src/types';
import { getProjectColorAndStatus } from 'src/helpers';
import { getProjectValueBAM } from 'src/helpers';
import { getProjectDate } from 'src/helpers';

type ProjectType = 'Fixed' | 'OnGoing';
type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';
type ProjectStatus = 'Active' | 'OnHold' | 'Inactive' | 'Completed';

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
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
													<PlanCardItem
														text='Project Value'
														amount={getProjectValueBAM(project.projectValueBAM) + ' KM'}
													/>
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
