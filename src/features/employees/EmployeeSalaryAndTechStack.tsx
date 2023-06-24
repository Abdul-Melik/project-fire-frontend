import { getEmployeeSalaryInBAM, getEmployeeTechStack } from 'src/helpers';
import { Employee } from 'src/types';

type Props = {
	employee: Employee;
};

const EmployeeSalaryAndTechStack = ({ employee }: Props) => {
	return (
		<div className='flex flex-col gap-4 rounded-lg bg-white p-6'>
			<div className='flex flex-col'>
				<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Monthly Salary (BAM)</span>
				<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
					{getEmployeeSalaryInBAM(employee.salary, employee.currency)}
				</span>
			</div>
			<div className='h-[1px] w-full bg-ashen-grey' />
			<div className='flex flex-col'>
				<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Tech Stack</span>
				<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
					{getEmployeeTechStack(employee.techStack)}
				</span>
			</div>
		</div>
	);
};

export default EmployeeSalaryAndTechStack;
