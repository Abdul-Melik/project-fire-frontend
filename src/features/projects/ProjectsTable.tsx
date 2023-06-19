import { Employee, Project } from 'src/types';
import { getProjectDate, getProjectValueBAM, getProjectColorAndStatus } from 'src/helpers';
import TableHeader from 'components/tableElements/TableHeader';
import TableRow from 'components/tableElements/TableRow';
import Avatars from 'features/projects/Avatars';
import ProjectsTableHead from 'features/projects/ProjectsTableHead';

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
	return (
		<div className='w-full rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='Projects Table' total={totalNumberOfProjects} value={value} handleSearch={handleSearch} />
			<table className='w-full border-t border-ashen-grey'>
				<ProjectsTableHead
					columns={columns}
					orderByField={orderByField}
					orderDirection={orderDirection}
					handleSort={handleSort}
				/>
				<tbody>
					{projects.map(project => {
						const projectId = project.id;
						let names:
							| {
									firstName: string;
									lastName: string;
							  }[]
							| undefined;
						let images: (string | undefined)[] | undefined;
						if (project.employees) {
							names = project.employees.map(({ employee }: { employee: Employee }) => ({
								firstName: employee.firstName,
								lastName: employee.lastName,
							}));
							images = project.employees.map(({ employee }: { employee: Employee }) => employee.image);
						} else {
							names = [];
							images = [];
						}
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
											className={`h-[6px] w-[6px] rounded-full ${
												getProjectColorAndStatus(project.projectStatus).color
											}`}
										/>
										<div className='font-gilroy-semi-bold font-semibold'>
											{getProjectColorAndStatus(project.projectStatus).status}
										</div>
									</div>
								</td>
							</TableRow>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectsTable;
