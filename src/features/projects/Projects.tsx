import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useGetProjectsQuery } from 'store/slices/projectsApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout/MainLayout';
import Navbar from 'components/navigation/NavBar';
import ProjectsTable from 'features/projects/ProjectsTable';
import Pagination from 'features/projects/Pagination';

const navLabels = ['All Projects', 'Active', 'On hold', 'Inactive', 'Completed'];

const Projects = () => {
	const navigate = useNavigate();
	const [activePage, setActivePage] = useState(1);
	const [projectStatus, setProjectStatus] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [projectsPerPage, setProjectsPerPage] = useState(10);
	const [orderByField, setOrderByField] = useState('name');
	const [orderDirection, setOrderDirection] = useState('asc');

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

	return (
		<MainLayout activeMenuItem={'projects'}>
			<div className='mx-14 mb-[17px] mt-[34px]'>
				<div className='mb-[30px] flex items-center justify-between'>
					<h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</h1>
					{user?.role === 'Admin' && (
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
							onClick={() => navigate('/projects/create')}
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
							/>
						)
					)}
				</div>
			</div>
			<div className='mx-14 mb-[25px]'>
				{isSuccess && (
					<Pagination
						totalNumberOfProjects={data.pageInfo.total}
						currentPage={currentPage}
						lastPage={data.pageInfo.lastPage}
						projectsPerPage={projectsPerPage}
						handleProjectsPerPage={projectsPerPage => {
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
