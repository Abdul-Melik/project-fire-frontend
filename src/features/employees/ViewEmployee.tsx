import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';

import { chevronLeft, avatar } from 'assets/media';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useGetEmployeeByIdQuery } from 'store/slices/employeesApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import SideDrawer from 'components/navigation/SideDrawer';

type Department = 'Administration' | 'Management' | 'Development' | 'Design';

type TechStack = 'AdminNA' | 'MgmtNA' | 'FullStack' | 'Frontend' | 'Backend' | 'UXUI';

type Projects = {
	project: {
		id: string;
		name: string;
	};
	partTime: boolean;
};

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
	department: Department;
	salary: number;
	techStack: TechStack;
	projects: Projects[];
};

type Props = {
	employee: Employee;
	closeViewEmployee: () => void;
	openEditEmployee: () => void;
};

const getEmployeeTechStack = (employee: Employee) => {
	const techStack = employee.techStack;
	if (techStack === 'AdminNA' || techStack === 'MgmtNA') return 'N/A';
	else if (techStack === 'FullStack') return 'Full stack';
	else if (techStack === 'Frontend') return 'Front end';
	else if (techStack === 'Backend') return 'Back end';
	else if (techStack === 'UXUI') return 'UX/UI';
};

const ViewEmployee = ({ employee, closeViewEmployee, openEditEmployee }: Props) => {
	const user = useAppSelector(selectCurrentUser);
	const { isLoading, isFetching, isSuccess, data, refetch } = useGetEmployeeByIdQuery(employee?.id ?? skipToken);

	useEffect(() => {
		if (employee) refetch();
	}, [refetch, employee]);

	const children = (
		<div className='fixed right-0 top-0 z-20 flex min-h-full w-[496px] flex-col bg-frosty-mint px-6 pb-6 pt-[27px]'>
			{(isLoading || isFetching) && <LoadingSpinner />}
			<div className='flex cursor-pointer items-center gap-[3px]' onClick={closeViewEmployee}>
				<img className='h-4 w-4' src={chevronLeft} alt='Back' />
				<span className='font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen'>Back</span>
			</div>
			{isSuccess && (
				<>
					<header className='mt-[13px]'>
						<div className='flex gap-4 rounded-lg bg-white p-6'>
							<img
								className='h-20 w-20 rounded-[4.61538px] object-cover opacity-80'
								src={data.image ? data.image : avatar}
								alt='Employee Image'
							/>
							<div className='flex flex-1 flex-col justify-center'>
								<span className='font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
									{data.firstName} {data.lastName}
								</span>
								<span className='font-gilroy-regular text-base font-normal text-slate-mist'>{data.department}</span>
							</div>
						</div>
					</header>
					<main className='mt-4 flex flex-col gap-5'>
						<div className='flex flex-col gap-4 rounded-lg bg-white p-6'>
							<div className='flex flex-col'>
								<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>
									Monthly Salary (BAM)
								</span>
								<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
									{data.salary.toFixed(2)}
								</span>
							</div>
							<div className='h-[1px] w-full bg-ashen-grey' />
							<div className='flex flex-col'>
								<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Tech Stack</span>
								<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
									{getEmployeeTechStack(data)}
								</span>
							</div>
						</div>
						<div className='flex flex-col rounded-lg bg-white p-6'>
							<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Assigned to projects</span>
							<div className='mt-2 flex flex-col gap-1'>
								{data.projects.map(({ project, partTime }: Projects, index: number) => (
									<div
										key={project.id}
										className={`flex items-center justify-between gap-4 p-2 ${
											index < data.projects.length - 1 ? 'border-b border-ashen-grey' : ''
										}`}
									>
										<span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.name}</span>
										<span
											className={`h-5 w-[68px] rounded-xl px-2 py-[2px] text-center font-gilroy-regular text-xs font-normal tracking-[0.16px] text-white ${
												partTime ? 'bg-blue-ash' : 'bg-sage-green'
											}`}
										>
											{partTime ? 'Part time' : 'Full time'}
										</span>
									</div>
								))}
							</div>
						</div>
					</main>
					{user?.role === 'Admin' && (
						<footer className='absolute bottom-0 left-0 flex w-full items-center justify-end gap-2 bg-white p-6'>
							<button className='rounded-md border border-crimson-blaze px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-crimson-blaze'>
								Delete Employee
							</button>
							<button
								className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white'
								onClick={() => {
									closeViewEmployee();
									openEditEmployee();
								}}
							>
								Edit Employee
							</button>
						</footer>
					)}
				</>
			)}
		</div>
	);

	return <SideDrawer onClick={closeViewEmployee}>{children}</SideDrawer>;
};

export default ViewEmployee;
