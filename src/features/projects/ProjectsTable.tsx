import { useCallback } from 'react';

import { Project } from 'src/types';
import { getEmployeeNamesAndImages, getProjectDate, getProjectValueBAM, getProjectColorAndStatus } from 'src/helpers';
import Table from 'components/tableElements/Table';
import TableRow from 'components/tableElements/TableRow';
import Avatars from 'features/projects/Avatars';

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
	openViewProject: (projectId: string) => void;
};

const columns = [
	{ name: 'Name', label: 'name' },
	{ name: 'Description', label: 'description' },
	{ name: 'Duration', label: 'startDate' },
	{ name: 'Developers', label: 'employeesCount' },
	{ name: 'Hourly rate', label: 'hourlyRate' },
	{ name: 'Project value in BAM', label: 'projectValueBAM' },
	{ name: 'Status', label: 'projectStatus' },
];

const ProjectsTable = ({
	totalNumberOfProjects,
	projects,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
	openViewProject,
}: Props) => {
	const getProjectsTableRow = useCallback(
		(project: Project) => {
			const projectId = project.id;
			const { names, images } = getEmployeeNamesAndImages(project.employees);
			return (
				<TableRow key={projectId} onClick={() => openViewProject(projectId)}>
					<td className='p-4'>{project.name}</td>
					<td className='p-4'>
						<div className='max-w-[100px] truncate'>{project.description}</div>
					</td>
					<td className='p-4'>{getProjectDate(project.startDate, project.endDate)}</td>
					<td className='py-1 pl-4 pr-2'>
						<Avatars names={names} images={images} />
					</td>
					<td className='p-4'>${project.hourlyRate}</td>
					<td className='p-4'>${getProjectValueBAM(project.projectValueBAM)} KM</td>
					<td className='p-4'>
						<div className='flex items-center gap-2'>
							<div
								className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project.projectStatus)?.color}`}
							/>
							<div className='font-gilroy-semi-bold font-semibold'>
								{getProjectColorAndStatus(project.projectStatus)?.status}
							</div>
						</div>
					</td>
				</TableRow>
			);
		},
		[openViewProject, getProjectDate, getProjectValueBAM, getProjectColorAndStatus, getProjectColorAndStatus]
	);

	return (
		<Table
			label='All Projects'
			total={totalNumberOfProjects}
			value={value}
			columns={columns}
			orderByField={orderByField}
			orderDirection={orderDirection}
			handleSearch={handleSearch}
			handleSort={handleSort}
			rows={projects.map(project => getProjectsTableRow(project))}
		/>
	);
};

export default ProjectsTable;
