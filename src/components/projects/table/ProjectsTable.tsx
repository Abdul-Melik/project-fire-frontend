import Avatars from 'src/components/projects/table/Avatars';
import TableHead from 'src/shared/components/table-elements/TableHead';
import TableRow from 'src/shared/components/table-elements/TableRow';
import TableHeader from 'src/shared/components/table-elements/TableHeader';

interface Project {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	actualEndDate: Date;
	projectStatus: string;
	hourlyRate: number;
	projectValueBAM: number;
	finished: boolean;
	employees: [
		{
			employee: {
				_id: string;
				firstName: string;
				lastName: string;
				department: string;
				salary: number;
				techStack: string[];
				__v: number;
			};
		}
	];
}

interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	image: string;
	employee: {
		_id: string;
		firstName: string;
		lastName: string;
		department: string;
		salary: number;
		techStack: string[];
		__v: number;
	};
}

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	users: User[];
	handleSearch: (input: string) => void;
};

const columns = [
	'Name',
	'Description',
	'Duration (from-to)',
	'Developers',
	'Hourly rate',
	'Project value in BAM',
	'Status',
];

const statusOrder: any = {
	active: 1,
	'on-hold': 2,
	inactive: 3,
	completed: 4,
};

const ProjectsTable = ({ totalNumberOfProjects, projects, users, handleSearch }: Props) => {
	const sortedProjects = projects.sort((a, b) => {
		const statusA = a.projectStatus.toLowerCase();
		const statusB = b.projectStatus.toLowerCase();
		return statusOrder[statusA] - statusOrder[statusB];
	});

	return (
		<>
			<div className='w-full rounded-md border border-ashen-grey bg-white'>
				<TableHeader totalNumberOfProjects={totalNumberOfProjects} data={sortedProjects} handleSearch={handleSearch} />
				<table className='w-full border-t border-ashen-grey'>
					<TableHead columns={columns} />
					<tbody>
						{projects.map((project, index) => {
							const employees = project.employees;
							const employeeIds = employees.map(employeeObj => employeeObj.employee._id);
							const employeeNames = employees.map(employeeObj => ({
								firstName: employeeObj.employee.firstName,
								lastName: employeeObj.employee.lastName,
							}));
							const images = users.filter(user => employeeIds.includes(user.employee._id)).map(user => user.image);
							return (
								<TableRow
									key={index}
									project={project}
									avatars={<Avatars employeeNames={employeeNames} images={images} />}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ProjectsTable;
