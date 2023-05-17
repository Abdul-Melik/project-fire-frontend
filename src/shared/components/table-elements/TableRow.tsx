type Props = {
	project: Project;
	avatars: any;
};

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

const getProjectDate = (project: Project) => {
	const startDate = new Date(project.startDate);
	const endDate = new Date(project.endDate);
	const actualEndDate = new Date(project.actualEndDate);
	const startDateString = startDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	const endDateString = endDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	const actualEndDateString = actualEndDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	return { startDateString, endDateString, actualEndDateString };
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

const TableRow = ({ project, avatars }: Props) => {
	return (
		<tr className='h-[60px] border-t border-ashen-grey text-left font-gilroy-regular text-sm font-normal leading-[22px] text-slate-mist'>
			<td className='w-[150px] pl-4'>{project.name}</td>
			<td className='line-clamp-1 w-[150px] text-ellipsis pl-4'>{project.description}</td>
			<td className='w-[150px] pl-4'>
				{getProjectDate(project).startDateString}
				{' - '}
				{getProjectDate(project).endDateString}
			</td>
			<td className='w-[150px] pl-4'>{avatars}</td>
			<td className='w-[150px] pl-4'>${project.hourlyRate}</td>
			<td className='w-[150px] pl-4'>${getProjectValueBAM(project)} KM</td>
			<td className='flex h-[60px] w-[150px] items-center gap-2 pl-4'>
				<div className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project).color}`} />
				<div className='font-gilroy-semi-bold font-semibold'>{getProjectColorAndStatus(project).status}</div>
			</td>
		</tr>
	);
};

export default TableRow;
