import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import Modal from 'src/shared/components/utils/Modal';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import Navbar from 'src/shared/components/navbar/Navbar';
import MainLayout from 'src/shared/components/layout/MainLayout';
import Pagination from 'src/components/projects/pagination/Pagination';

enum ProjectType {
	Fixed = 'fixed',
	OnGoing = 'on-going',
}

enum SalesChannel {
	Online = 'online',
	InPerson = 'in-person',
	Referral = 'referral',
	Other = 'other',
}

interface Project {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	actualEndDate: Date;
	projectType: ProjectType;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: SalesChannel;
	finished: boolean;
}

const Projects = () => {
	const { token } = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activePage, setActivePage] = useState(1);
	const [projects, setProjects] = useState<Project[]>([]);
	const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [projectsPerPage, setProjectsPerPage] = useState(5);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getProjects = useCallback(async () => {
		try {
			const response = await axios.get(`${baseUrl}/api/projects?limit=${projectsPerPage}&page=${currentPage}`, {
				headers: { Authorization: 'Bearer ' + token },
			});
			setProjects(response.data.projects);
			setTotalNumberOfProjects(response.data.pageInfo.total);
			setLastPage(response.data.pageInfo.lastPage);
			if (currentPage > lastPage) {
				setCurrentPage(lastPage);
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
		setIsLoading(false);
	}, [token, projectsPerPage, currentPage, lastPage]);

	useEffect(() => {
		if (token) getProjects();
	}, [token, projectsPerPage, currentPage, lastPage]);

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
				<div className='mx-14 my-[34px]'>
					<div className='flex items-center justify-between'>
						<div className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</div>
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
							onClick={() => {}}
						>
							Create new project
						</button>
					</div>
					<div className='mt-[30px] flex flex-col'>
						<div className='mb-12'>
							<Navbar navLabels={navLabels} handlePageSelect={pageNumber => setActivePage(pageNumber)} />
						</div>
						{isLoading ? (
							<LoadingSpinner />
						) : (
							<div className='flex flex-col gap-4'>
								{projects.map(project => (
									<div className='border border-black p-2' key={project.name}>
										{JSON.stringify(project.name)} {JSON.stringify(project.description)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='mx-14 mb-[25px] mt-[17px]'>
					<Pagination
						totalNumberOfProjects={totalNumberOfProjects}
						currentPage={currentPage}
						lastPage={lastPage}
						projectsPerPage={projectsPerPage}
						handleProjectsPerPage={projectsPerPage => setProjectsPerPage(projectsPerPage)}
						handlePageChange={pageNumber => setCurrentPage(pageNumber)}
					/>
				</div>
			</MainLayout>
		</>
	);
};

export default Projects;
