import { Project } from 'src/types';
import TableHead from 'src/shared/components/table-elements/TableHead';
import TableRow from 'src/shared/components/table-elements/TableRow';
import TableHeader from 'src/shared/components/table-elements/TableHeader';
import Avatars from 'src/components/projects/table/Avatars';

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	value: string;
	handleSearch: (input: string) => void;
	handleSort: Function;
	selectedColumn: string;
};

const columns = [
	{ name: 'Name', label: 'name', order: 'desc' },
	{ name: 'Description', label: 'description', order: 'desc' },
	{ name: 'Duration', label: 'startDate', order: 'desc' },
	{ name: 'Developers', label: 'employees', order: 'desc' },
	{ name: 'Hourly rate', label: 'hourlyRate', order: 'desc' },
	{ name: 'Project value in BAM', label: 'projectValueBAM', order: 'desc' },
	{ name: 'Status', label: 'projectStatus', order: 'desc' },
];

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

const ProjectsTable = ({ totalNumberOfProjects, projects, value, handleSearch, handleSort, selectedColumn }: Props) => {
	return (
		<div className='w-full rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='Projects Table' total={totalNumberOfProjects} value={value} handleSearch={handleSearch} />
			<table className='w-full border-t border-ashen-grey'>
				<TableHead columns={columns} handleSort={handleSort} selectedColumn={selectedColumn} />
				<tbody>
					{projects.map(project => {
						const projectId = project.id;
						const employees = project.employees.map(employeeObj => employeeObj.employee);
						let names:
							| {
									firstName: string;
									lastName: string;
							  }[]
							| undefined;
						let images: (string | undefined)[] | undefined;
						if (employees) {
							names = employees.map(employee => ({
								firstName: employee.firstName,
								lastName: employee.lastName,
							}));
							images = employees.map(employee => employee.image);
						} else {
							names = [];
							images = [];
						}
						return (
							<TableRow key={projectId}>
								<td className='w-[150px] pl-4'>{project.name}</td>
								<td className='line-clamp-1 w-[150px] text-ellipsis pl-4'>{project.description}</td>
								<td className='w-[150px] pl-4'>
									{getProjectDate(project).startDateString}
									{' - '}
									{getProjectDate(project).endDateString}
								</td>
								<td className='w-[150px] pl-4'>
									<Avatars names={names} images={images} />
								</td>
								<td className='w-[150px] pl-4'>${project.hourlyRate}</td>
								<td className='w-[150px] pl-4'>${getProjectValueBAM(project)} KM</td>
								<td className='flex h-[60px] w-[150px] items-center gap-2 pl-4'>
									<div className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project).color}`} />
									<div className='font-gilroy-semi-bold font-semibold'>{getProjectColorAndStatus(project).status}</div>
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
