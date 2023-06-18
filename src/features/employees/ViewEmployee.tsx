import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { chevronLeft } from 'assets/media';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useDeleteEmployeeMutation } from 'store/slices/employeesApiSlice';
import SideDrawer from 'components/navigation/SideDrawer';
import AlertModal from 'components/modals/AlertModal';
import EmployeeCard from 'components/cards/EmployeeCard';
import EmployeeInfoCard from 'components/cards/EmployeeInfoCard';
import AssignedProjectsCard from 'components/cards/AssignedProjectsCard';
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
							<EmployeeCard
								firstName={employee.firstName}
								lastName={employee.lastName}
								image={employee.image}
								department={employee.department}
							/>
						</header>
						<main className='mt-4 flex flex-col gap-5'>
							<EmployeeInfoCard salary={employee.salary} techStack={employee.techStack} />
							<AssignedProjectsCard projects={employee.projects} />
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
