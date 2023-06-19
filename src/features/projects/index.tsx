import { useState, useEffect } from 'react';

import { Project } from 'src/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useGetProjectsQuery } from 'store/slices/projectsApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout';
import Navbar from 'components/navigation/NavBar';
import Pagination from 'components/pagination';
import ProjectsTable from 'features/projects/ProjectsTable';
import ViewProject from 'features/projects/ViewProject';

const navLabels = ['All Projects', 'Active', 'On hold', 'Inactive', 'Completed'];

const Projects = () => {
	const [activePage, setActivePage] = useState(1);
	const [isViewProjectOpen, setIsViewProjectOpen] = useState(false);
	const [isAddNewProjectOpen, setIsAddNewProjectOpen] = useState(false);
	const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
	const [projectId, setProjectId] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [projectStatus, setProjectStatus] = useState('');
	const [orderByField, setOrderByField] = useState('name');
	const [orderDirection, setOrderDirection] = useState('asc');
	const [projectsPerPage, setProjectsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const user = useAppSelector(selectCurrentUser);
	const { isLoading, isFetching, isSuccess, data } = useGetProjectsQuery(
		{
			searchTerm,
			projectStatus,
			orderByField,
			orderDirection,
			projectsPerPage,
			currentPage,
		},
		{
			pollingInterval: 60000,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		}
	);

	useEffect(() => {
		if (activePage === 1) setProjectStatus('');
		else if (activePage === 2) setProjectStatus('Active');
		else if (activePage === 3) setProjectStatus('OnHold');
		else if (activePage === 4) setProjectStatus('Inactive');
		else if (activePage === 5) setProjectStatus('Completed');
	}, [activePage]);

	const project = isSuccess && data.projects.find((project: Project) => project.id === projectId);

	return (
		<MainLayout activeMenuItem={'projects'}>
			{isViewProjectOpen && (
				<ViewProject
					project={project}
					closeViewProject={() => setIsViewProjectOpen(false)}
					openEditProject={() => setIsEditProjectOpen(true)}
				/>
			)}
			<div className='mx-14 mb-[17px] mt-[34px]'>
				<div className='mb-[30px] flex items-center justify-between'>
					<h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</h1>
					{user?.role === 'Admin' && (
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
							onClick={() => {}}
						>
							Create new project
						</button>
					)}
				</div>
				<div className='flex flex-col'>
					<div className='mb-[30px]'>
						<Navbar
							navLabels={navLabels}
							handlePageSelect={pageNumber => {
								setActivePage(pageNumber);
								setProjectsPerPage(10);
								setCurrentPage(1);
								setSearchTerm('');
								setOrderByField('name');
								setOrderDirection('asc');
							}}
						/>
					</div>
					{isLoading || isFetching ? (
						<LoadingSpinner />
					) : (
						isSuccess && (
							<ProjectsTable
								totalNumberOfProjects={data.pageInfo.total}
								projects={data.projects}
								value={searchTerm}
								orderByField={orderByField}
								orderDirection={orderDirection}
								handleSearch={input => setSearchTerm(input)}
								handleSort={(label: string, orderDirection: string) => {
									setOrderByField(label);
									setOrderDirection(orderDirection);
								}}
								openViewProject={(projectId: string) => {
									setIsViewProjectOpen(true);
									setProjectId(projectId);
								}}
							/>
						)
					)}
				</div>
			</div>
			<div className='mx-14 mb-[25px]'>
				{isSuccess && (
					<Pagination
						total={data.pageInfo.total}
						currentPage={data.pageInfo.currentPage}
						lastPage={data.pageInfo.lastPage}
						perPage={projectsPerPage}
						items='Projects'
						handlePerPage={projectsPerPage => {
							setProjectsPerPage(projectsPerPage);
							setCurrentPage(1);
							setSearchTerm('');
						}}
						handlePageChange={pageNumber => setCurrentPage(pageNumber)}
					/>
				)}
			</div>
		</MainLayout>
	);
};

export default Projects;
