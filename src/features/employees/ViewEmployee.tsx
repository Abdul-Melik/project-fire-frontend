import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { chevronLeft, avatar } from 'assets/media';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useDeleteEmployeeMutation } from 'store/slices/employeesApiSlice';
import SideDrawer from 'components/navigation/SideDrawer';
import AlertModal from 'components/modals/AlertModal';
import ViewFooter from 'components/utils/ViewFooter';

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

const getEmployeeTechStack = (techStack: TechStack) => {
	if (techStack === 'AdminNA' || techStack === 'MgmtNA') return 'N/A';
	else if (techStack === 'FullStack') return 'Full stack';
	else if (techStack === 'Frontend') return 'Front end';
	else if (techStack === 'Backend') return 'Back end';
	else if (techStack === 'UXUI') return 'UX/UI';
};

const ViewEmployee = ({ employee, closeViewEmployee, openEditEmployee }: Props) => {
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

	const user = useAppSelector(selectCurrentUser);
	const [deleteEmployee, { isSuccess: isDeleteSuccess }] = useDeleteEmployeeMutation();

	const onConfirm = async () => {
		await deleteEmployee({ employeeId: employee.id });
	};

	useEffect(() => {
		if (isDeleteSuccess) {
			setIsAlertModalOpen(false);
			closeViewEmployee();
		}
	}, [isDeleteSuccess]);

	const children = (
		<>
			{isAlertModalOpen && (
				<AlertModal
					alertTitle={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`}
					alertDescription={`This will permanently delete ${employee.firstName} ${employee.lastName} and all associated data. You cannot undo this action.`}
					cancelButtonText="Don't Delete"
					confirmButtonText='Delete'
					confirmButtoncolor='#FF4D4F'
					onCancel={() => setIsAlertModalOpen(false)}
					onConfirm={onConfirm}
				/>
			)}
			<motion.div
				initial={{ opacity: 0, x: '100%' }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, ease: 'easeInOut' }}
				className='fixed right-0 top-0 z-20 flex min-h-full w-[496px] flex-col bg-frosty-mint px-6 pb-6 pt-[27px]'
			>
				<div className='flex cursor-pointer items-center gap-[3px]' onClick={closeViewEmployee}>
					<img className='h-4 w-4' src={chevronLeft} alt='Back icon' />
					<span className='font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen'>Back</span>
				</div>
				{employee && (
					<>
						<header className='mt-[13px]'>
							<div className='flex gap-4 rounded-lg bg-white p-6'>
								<img
									className='h-20 w-20 rounded-[4.61538px] object-cover opacity-80'
									src={employee.image ? employee.image : avatar}
									alt='Employee image'
								/>
								<div className='flex flex-1 flex-col justify-center'>
									<span className='font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
										{employee.firstName} {employee.lastName}
									</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
										{employee.department}
									</span>
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
										{employee.salary.toFixed(2)}
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
							<div className='flex max-h-[500px] flex-col overflow-scroll rounded-lg bg-white p-6'>
								<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>
									Assigned to projects
								</span>
								<div className='mt-2 flex flex-col gap-1'>
									{employee.projects.map(({ project, partTime }: Projects, index: number) => (
										<div
											key={project.id}
											className={`flex items-center justify-between gap-4 p-2 ${
												index < employee.projects.length - 1 ? 'border-b border-ashen-grey' : ''
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
							<ViewFooter
								handleDelete={() => setIsAlertModalOpen(true)}
								handleEdit={() => {
									closeViewEmployee();
									openEditEmployee();
								}}
							/>
						)}
					</>
				)}
			</motion.div>
		</>
	);

	return <SideDrawer onClick={closeViewEmployee}>{children}</SideDrawer>;
};

export default ViewEmployee;
