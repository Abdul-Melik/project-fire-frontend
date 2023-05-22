import Avatars from 'src/components/projects/table/Avatars';
import TableHead from 'src/shared/components/table-elements/TableHead';
import TableRow from 'src/shared/components/table-elements/TableRow';
import TableHeader from 'src/shared/components/table-elements/TableHeader';

interface Project {
	id: string;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	actualEndDate?: Date;
	projectType: string;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: string;
	projectStatus: string;
	finished: boolean;
	employees: {
		employee: string;
		fullTime: boolean;
	}[];
}

interface UsersPerProject {
	id: string;
	name: string;
	users: {
		id: string;
		firstName: string;
		lastName: string;
		role: string;
		image?: string;
		employee: string;
	}[];
}

type Props = {
	totalNumberOfProjects: number;
	projects: Project[];
	usersPerProject: UsersPerProject[];
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
	if (projectStatus === 'active') return { color: 'bg-spring-fern', status: 'Active' };
	else if (projectStatus === 'on-hold') return { color: 'bg-golden-tangerine', status: 'On hold' };
	else if (projectStatus === 'inactive') return { color: 'bg-silver-mist', status: 'Inactive' };
	else return { color: 'bg-cerulean-breeze', status: 'Completed' };
};

const ProjectsTable = ({ totalNumberOfProjects, projects, usersPerProject, handleSearch }: Props) => {
	return (
		<div className='w-full rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='Projects Table' total={totalNumberOfProjects} handleSearch={handleSearch} />
			<table className='w-full border-t border-ashen-grey'>
				<TableHead columns={columns} />
				<tbody>
					{projects.map(project => {
						const projectId = project.id;
						const usersForProject = usersPerProject.find(userObj => userObj.id === projectId);
						const users = usersForProject && usersForProject.users ? usersForProject.users : null;
						let names:
							| {
									firstName: string;
									lastName: string;
							  }[]
							| undefined;
						let images: (string | undefined)[] | undefined;
						if (users) {
							names = users.map(user => ({
								firstName: user.firstName,
								lastName: user.lastName,
							}));
							images = users.map(user => user.image);
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
