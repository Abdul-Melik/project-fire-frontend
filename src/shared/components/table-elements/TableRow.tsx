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
			};
		}
	];
}

const getDates = (project: Project) => {
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

const getColor = (project: string) => {
	if (project === 'active') {
		return 'bg-[#32C653]';
	} else if (project === 'on-hold') {
		return 'bg-[#FFB341]';
	} else return 'bg-[#CECECE]';
};

const TableRow = ({ project, avatars }: Props) => {
	return (
		<tr className='h-[60px] w-[157px] border-t border-ashen-grey text-left font-gilroy-regular text-sm text-[#6C6D75]'>
			<td className='w-[150px] pl-4'>{project.name}</td>
			<td className='w-[150px] pl-4'>{project.description}</td>
			<td className='w-[150px] pl-4'>
				{getDates(project).startDateString}
				{' - '}
				{getDates(project).endDateString}
			</td>
			<td className='w-[150px] pl-4'>{avatars}</td>
			<td className='w-[150px] pl-4'>${project.hourlyRate}</td>
			<td className='w-[150px] pl-4'>{project.projectValueBAM} KM</td>
			<td className='flex w-[150px] pl-9 pt-[19px]'>
				{' '}
				<div className={`mb-auto mr-2 mt-auto h-[6px] w-[6px] rounded-full ${getColor(project.projectStatus)}`}></div>
				{project.projectStatus}
			</td>
		</tr>
	);
};

export default TableRow;
