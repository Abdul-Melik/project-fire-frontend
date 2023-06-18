import TableHeader from 'components/tableElements/TableHeader';
import TableRow from 'components/tableElements/TableRow';
import Avatars from 'features/projects/Avatars';
import ProjectsTableHead from 'features/projects/ProjectsTableHead';

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
	if (projectStatus === 'OnHold') return { color: 'bg-golden-tangerine', status: 'On hold' };
	if (projectStatus === 'Inactive') return { color: 'bg-silver-mist', status: 'Inactive' };
	return { color: 'bg-cerulean-breeze', status: 'Completed' };
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
								<td className='p-4'>{project.name}</td>
								<td className='p-4'>
									<div className='max-w-[100px] truncate'>{project.description}</div>
								</td>
								<td className='p-4'>
									{getProjectDate(project).startDateString}
									{' - '}
									{getProjectDate(project).endDateString}
								</td>
								<td className='py-1 pl-4 pr-2'>
									<Avatars names={names} images={images} />
								</td>
								<td className='p-4'>${project.hourlyRate}</td>
								<td className='p-4'>${getProjectValueBAM(project)} KM</td>
								<td className='p-4'>
									<div className='flex items-center gap-2'>
										<div className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project).color}`} />
										<div className='font-gilroy-semi-bold font-semibold'>
											{getProjectColorAndStatus(project).status}
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
