import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Project } from 'src/types';
import { getProjectDate, getProjectValueBAM, getProjectColorAndStatus } from 'src/helpers';
import { chevronLeft } from 'assets/media';
import { useAppSelector } from 'store/hooks';
import { selectUserRole } from 'store/slices/authSlice';
import { useDeleteProjectMutation } from 'store/slices/projectsApiSlice';
import BackButton from 'components/utils/BackButton';
import AlertModal from 'components/modals/AlertModal';
import SideDrawer from 'components/navigation/SideDrawer';
import Footer from 'components/layout/Footer';

type Props = {
	project: Project;
	closeViewProjectSideDrawer: () => void;
	openEditProjectSideDrawer: () => void;
};

const ViewProject = ({ project, closeViewProjectSideDrawer, openEditProjectSideDrawer }: Props) => {
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

	const userRole = useAppSelector(selectUserRole);
	const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

	const onConfirm = async () => {
		await deleteProject({ projectId: project.id });
	};

	useEffect(() => {
		if (isSuccess) {
			setIsAlertModalOpen(false);
			closeViewProjectSideDrawer();
		}
	}, [isSuccess]);

	const children = (
		<>
			{isAlertModalOpen && (
				<AlertModal
					alertTitle={`Are you sure you want to delete ${project.name}?`}
					alertDescription={`This will permanently delete ${project.name} and all associated data. You cannot undo this action.`}
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
				<BackButton closeSideDrawer={closeViewProjectSideDrawer} />
				{project && (
					<>
						<header className='mt-[13px]'>
							<h2 className='rounded-lg bg-white px-6 py-4 font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
								{project.name}
							</h2>
						</header>
						<main className='mt-4 flex flex-col gap-5'>
							<div className='flex flex-col gap-4 rounded-lg bg-white p-6'>
								<div className='flex flex-col border-b border-ashen-grey pb-4'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Name</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>{project.name}</span>
								</div>
								<div className='flex flex-col border-b border-ashen-grey pb-4'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Description</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
										{project.description}
									</span>
								</div>
								<div className='flex flex-col border-b border-ashen-grey pb-4'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Duration</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
										{getProjectDate(project.startDate, project.endDate)}
									</span>
								</div>
								<div className='flex flex-col border-b border-ashen-grey pb-4'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Team members</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
										{project.employees.map(({ employee }) => `${employee.firstName} ${employee.lastName}`).join(', ')}
									</span>
								</div>
								<div className='flex flex-col border-b border-ashen-grey pb-4'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Hourly Rate (USD)</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
										{project.hourlyRate}
									</span>
								</div>
								<div className='flex flex-col border-b border-ashen-grey pb-4'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>
										Project Value (BAM)
									</span>
									<span className='font-gilroy-regular text-base font-normal text-slate-mist'>
										{getProjectValueBAM(project.projectValueBAM)}
									</span>
								</div>
								<div className='flex flex-col'>
									<span className='font-gilroy-medium text-base font-medium text-midnight-grey'>Status</span>
									<div className='flex items-center gap-2'>
										<div
											className={`h-[6px] w-[6px] rounded-full ${
												getProjectColorAndStatus(project.projectStatus)?.color
											}`}
										/>
										<div className='font-gilroy-regular font-normal text-slate-mist'>
											{getProjectColorAndStatus(project.projectStatus)?.status}
										</div>
									</div>
								</div>
							</div>
						</main>
						{userRole === 'Admin' && (
							<Footer
								firstButtonClassName='border border-crimson-blaze text-crimson-blaze'
								secondButtonClassName='bg-deep-teal text-white'
								firstButtonText='Delete Project'
								secondButtonText='Edit Project'
								handleFirstButtonClick={() => setIsAlertModalOpen(true)}
								handleSecondButtonClick={() => {
									closeViewProjectSideDrawer();
									openEditProjectSideDrawer();
								}}
							/>
						)}
					</>
				)}
			</motion.div>
		</>
	);

	return <SideDrawer onClick={closeViewProjectSideDrawer}>{children}</SideDrawer>;
};

export default ViewProject;
