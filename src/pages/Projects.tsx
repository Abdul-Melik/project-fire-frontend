import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import Modal from 'src/shared/components/utils/Modal';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import Navbar from 'src/shared/components/navbar/Navbar';
import MainLayout from 'src/shared/components/layout/MainLayout';
import Pagination from 'src/components/projects/pagination/Pagination';
import ProjectsTable from 'src/components/projects/table/ProjectsTable';

interface Project {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	actualEndDate: Date;
	projectType: string;
	projectStatus: string;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: string;
	finished: boolean;
	employees: [
		{
			employee: {
				_id: string;
				firstName: string;
				lastName: string;
				department: string;
				salary: number;
				techStack: string[];
				__v: number;
			};
		}
	];
}

const Projects = () => {
	const { token } = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activePage, setActivePage] = useState(1);
	const [projectStatus, setProjectStatus] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [projects, setProjects] = useState<Project[]>([]);
	const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [projectsPerPage, setProjectsPerPage] = useState(10);
	const [users, setUsers] = useState<any[]>([]);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getProjects = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${baseUrl}/api/projects?name=${searchTerm}&projectStatus=${projectStatus}&limit=${projectsPerPage}&page=${currentPage}`,
				{
					headers: { Authorization: 'Bearer ' + token },
				}
			);
			setProjects(response.data.projects);
			setTotalNumberOfProjects(response.data.pageInfo.total);
			setLastPage(response.data.pageInfo.lastPage);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
		setIsLoading(false);
	}, [token, searchTerm, projectStatus, projectsPerPage, currentPage]);

	useEffect(() => {
		if (token) getProjects();
	}, [token, searchTerm, projectStatus, projectsPerPage, currentPage]);

	useEffect(() => {
		if (activePage === 1) setProjectStatus('');
		else if (activePage === 2) setProjectStatus('active');
		else if (activePage === 3) setProjectStatus('inactive');
		else if (activePage === 4) setProjectStatus('completed');
	}, [activePage]);

	const getUsers = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/users`, {
				headers: { Authorization: 'Bearer ' + token },
			});
			setUsers(response.data);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
		setIsLoading(false);
	}, [token, searchTerm, projectStatus, projectsPerPage, currentPage]);

	useEffect(() => {
		if (token) getUsers();
	}, [token, searchTerm, projectStatus, projectsPerPage, currentPage]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navLabels = ['All Projects', 'Active', 'Inactive', 'Completed'];

	return (
		<>
			<Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			<MainLayout activeMenuItem={'projects'}>
				<div className='mx-14 mb-[17px] mt-[34px]'>
					<div className='mb-[30px] flex items-center justify-between'>
						<div className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</div>
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
							onClick={() => {}}
						>
							Create new project
						</button>
					</div>
					<div className='flex flex-col'>
						<div className='mb-[30px]'>
							<Navbar
								navLabels={navLabels}
								handlePageSelect={pageNumber => {
									setActivePage(pageNumber);
									setProjectsPerPage(5);
									setCurrentPage(1);
									setSearchTerm('');
								}}
							/>
						</div>
						{isLoading ? (
							<LoadingSpinner />
						) : (
							<ProjectsTable
								totalNumberOfProjects={totalNumberOfProjects}
								projects={projects}
								users={users}
								handleSearch={input => setSearchTerm(input)}
							/>
						)}
					</div>
				</div>
				<div className='mx-14 mb-[25px]'>
					<Pagination
						totalNumberOfProjects={totalNumberOfProjects}
						currentPage={currentPage}
						lastPage={lastPage}
						projectsPerPage={projectsPerPage}
						handleProjectsPerPage={projectsPerPage => {
							setProjectsPerPage(projectsPerPage);
							setCurrentPage(1);
						}}
						handlePageChange={pageNumber => setCurrentPage(pageNumber)}
					/>
				</div>
			</MainLayout>
		</>
	);
};

export default Projects;
