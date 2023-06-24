import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Employee, Projects } from 'src/types';
import { getEmployeeSalaryInBAM, getEmployeeTechStack } from 'src/helpers';
import { useAppSelector } from 'store/hooks';
import { selectUserRole } from 'store/slices/authSlice';
import { useDeleteEmployeeMutation } from 'store/slices/employeesApiSlice';
import BackButton from 'components/utils/BackButton';
import AlertModal from 'components/modals/AlertModal';
import EmployeeCard from 'components/cards/EmployeeCard';
import SideDrawer from 'components/navigation/SideDrawer';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

type Props = {
	employee: Employee;
	closeViewEmployeeSideDrawer: () => void;
	openEditEmployeeSideDrawer: () => void;
};

const ViewEmployee = ({ employee, closeViewEmployeeSideDrawer, openEditEmployeeSideDrawer }: Props) => {
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

	const userRole = useAppSelector(selectUserRole);
	const [deleteEmployee, { isSuccess }] = useDeleteEmployeeMutation();

	const onConfirm = async () => {
		await deleteEmployee({ employeeId: employee.id });
	};

	useEffect(() => {
		if (isSuccess) {
			setIsAlertModalOpen(false);
			closeViewEmployeeSideDrawer();
		}
	}, [isSuccess]);

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
				<BackButton closeSideDrawer={closeViewEmployeeSideDrawer} />
				{employee && (
					<>
						<Header className='mt-[13px]'>
							<EmployeeCard employee={employee} />
						</Header>
						<main className='mt-4 flex flex-col gap-5'>
							<div className='flex flex-col gap-4 rounded-lg bg-white p-6'>
								<div className='flex flex-col'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>
										Monthly Salary (BAM)
									</span>
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
							<div
								className={`flex max-h-[240px] flex-col ${
									employee.projects.length > 0
										? 'overflow-y-scroll scrollbar-thin scrollbar-track-ashen-grey scrollbar-thumb-misty-moonstone scrollbar-track-rounded-full scrollbar-thumb-rounded-full'
										: ''
								} rounded-lg bg-white p-6`}
							>
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
						{userRole === 'Admin' && (
							<Footer
								firstButtonClassName='border border-crimson-blaze text-crimson-blaze'
								secondButtonClassName='bg-deep-teal text-white'
								firstButtonText='Delete Employee'
								secondButtonText='Edit Employee'
								handleFirstButtonClick={() => setIsAlertModalOpen(true)}
								handleSecondButtonClick={() => {
									closeViewEmployeeSideDrawer();
									openEditEmployeeSideDrawer();
								}}
							/>
						)}
					</>
				)}
			</motion.div>
		</>
	);

	return <SideDrawer onClick={closeViewEmployeeSideDrawer}>{children}</SideDrawer>;
};

export default ViewEmployee;
