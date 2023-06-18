type TechStack = 'AdminNA' | 'MgmtNA' | 'FullStack' | 'Frontend' | 'Backend' | 'UXUI';

type Props = {
	salary: number;
	techStack: TechStack;
};

const getEmployeeTechStack = (techStack: TechStack) => {
	if (techStack === 'AdminNA' || techStack === 'MgmtNA') return 'N/A';
	else if (techStack === 'FullStack') return 'Full stack';
	else if (techStack === 'Frontend') return 'Front end';
	else if (techStack === 'Backend') return 'Back end';
	else if (techStack === 'UXUI') return 'UX/UI';
};

const EmployeeInfoCard = ({ salary, techStack }: Props) => {
	return (
		<div className='flex flex-col gap-4 rounded-lg bg-white p-6'>
			<div className='flex flex-col'>
				<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Monthly Salary (BAM)</span>
				<span className='font-gilroy-regular text-base font-normal text-slate-mist'>{salary.toFixed(2)}</span>
			</div>
			<div className='h-[1px] w-full bg-ashen-grey' />
			<div className='flex flex-col'>
				<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Tech Stack</span>
				<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
					{getEmployeeTechStack(techStack)}
				</span>
			</div>
		</div>
	);
};

export default EmployeeInfoCard;
