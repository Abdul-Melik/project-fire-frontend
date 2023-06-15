import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import Navbar from 'src/shared/components/navbar/Navbar';
import MainLayout from 'src/shared/components/layout/MainLayout';
import ProjectsTable from 'src/components/projects/table/ProjectsTable';
import Pagination from 'src/components/projects/pagination/Pagination';
import PlanCardItem from 'src/components/home/plan/PlanCardItem';
import DataCard from 'src/shared/components/cards/DataCard';
import arrow from 'src/assets/media/svg/arrow.svg';
import YearSelector from 'src/shared/components/utils/YearSelector';
import ResponsiveProjectsTable from 'src/components/projects/table/ResponsiveProjectsTable';

const navLabels = ['All Projects', 'Active', 'On hold', 'Inactive', 'Completed'];

type ProjectType = 'Fixed' | 'OnGoing';

type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';

type ProjectStatus = 'Active' | 'OnHold' | 'Inactive' | 'Completed';

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
	department: string;
	salary: number;
	techStack: string[];
};

type EmployeesPerProject = {
	partTime: boolean;
	employee: Employee;
};

type Project = {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	actualEndDate: string;
	projectType: ProjectType;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: SalesChannel;
	projectStatus: ProjectStatus;
	employees: EmployeesPerProject[];
};

const Projects = () => {
	const { token, user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [activePage, setActivePage] = useState(1);
	const [projectStatus, setProjectStatus] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [projects, setProjects] = useState<Project[]>([]);
	const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [projectsPerPage, setProjectsPerPage] = useState(10);
	const [orderByField, setOrderByField] = useState('startDate');
	const [orderDirection, setOrderDirection] = useState('desc');
	const [currentProject, setCurrentProject] = useState<Project | null>(null);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getProjectDate = (project: Project) => {
		const startDate = new Date(project.startDate);
		const endDate = new Date(project.endDate);
		const startDateString = startDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
		});
		const endDateString = endDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
		});
		return { startDateString, endDateString };
	};

	const getProjects = useCallback(async () => {
		setIsLoading(true);
		let status = projectStatus === 'All Projects' ? '' : projectStatus === 'On Hold' ? 'OnHold' : projectStatus;
		try {
			const response = await axios.get(
				`${baseUrl}/api/projects?name=${searchTerm}&projectStatus=${status}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${projectsPerPage}&page=${currentPage}`,
				{
					headers: { Authorization: 'Bearer ' + token },
				}
			);
			setProjects(response.data.projects);
			setCurrentProject(response.data.projects[0]);
			setTotalNumberOfProjects(response.data.pageInfo.total);
			setLastPage(response.data.pageInfo.lastPage);
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
		setIsLoading(false);
	}, [token, searchTerm, projectStatus, projectsPerPage, currentPage, orderByField, orderDirection]);

	useEffect(() => {
		if (token) getProjects();
	}, [token, searchTerm, projectStatus, projectsPerPage, currentPage, orderByField, orderDirection]);

	useEffect(() => {
		if (activePage === 1) setProjectStatus('');
		else if (activePage === 2) setProjectStatus('Active');
		else if (activePage === 3) setProjectStatus('OnHold');
		else if (activePage === 4) setProjectStatus('Inactive');
		else if (activePage === 5) setProjectStatus('Completed');
	}, [activePage]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleArrowClick = (direction: string) => {
		// if direction is right and current project is not the last one
		if (direction === 'right' && projects.indexOf(currentProject!) !== projects.length - 1) {
			setCurrentProject(projects[projects.indexOf(currentProject!) + 1]);
		}
		// if direction is left and current project is not the first one
		else if (direction === 'left' && projects.indexOf(currentProject!) !== 0) {
			setCurrentProject(projects[projects.indexOf(currentProject!) - 1]);
		}
		// if direction is right and current project is the last one set current page to next page and call getProjects
		else if (direction === 'right' && projects.indexOf(currentProject!) === projects.length - 1) {
			//check if there is next page
			if (currentPage !== lastPage) {
				setCurrentPage(currentPage + 1);
				setCurrentProject(projects[0]);
			}
			//if there is no next page set current page to 1 and call getProjects
			else {
				setCurrentPage(1);
				setCurrentProject(projects[0]);
			}
		}
		// if direction is left and current project is the first one set current page to last page and call getProjects
		else if (direction === 'left' && projects.indexOf(currentProject!) === 0) {
			//check if there is previous page
			if (currentPage !== 1) {
				setCurrentPage(currentPage - 1);
				setCurrentProject(projects[projects.length - 1]);
			}
			//if there is no previous page set current page to last page and call getProjects
			else {
				setCurrentPage(lastPage);
				setCurrentProject(projects[projects.length - 1]);
			}
		}
	};

	return (
		<>
			<MainLayout activeMenuItem={'projects'}>
				<div className='mx-14 mb-[17px] mt-14 sm:mt-[34px]'>
					<div className='mb-[30px] flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0'>
						<h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</h1>
						<button
							className={`rounded-md px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white ${
								user?.role === 'Admin' ? 'bg-deep-teal hover:saturate-[400%]' : 'cursor-not-allowed bg-whispering-gray'
							}`}
							disabled={user?.role !== 'Admin'}
							onClick={() => navigate('/projects/create')}
						>
							Create new project
						</button>
					</div>
					<div className='flex w-full justify-center sm:hidden'>
						<YearSelector
							label='Filter'
							options={['All Projects', 'Active', 'On Hold', 'Inactive', 'Completed']}
							defaultValue='All Projects'
							handleYearSelect={status => setProjectStatus(status)}
						/>
					</div>
					<div className='hidden flex-col sm:flex'>
						<div className='mb-[30px]'>
							<Navbar
								navLabels={navLabels}
								handlePageSelect={pageNumber => {
									setActivePage(pageNumber);
									setProjectsPerPage(10);
									setCurrentPage(1);
									setSearchTerm('');
									setOrderByField('startDate');
									setOrderDirection('desc');
								}}
							/>
						</div>
						{isLoading ? (
							<LoadingSpinner />
						) : (
							<ProjectsTable
								totalNumberOfProjects={totalNumberOfProjects}
								projects={projects}
								value={searchTerm}
								orderByField={orderByField}
								orderDirection={orderDirection}
								handleSearch={input => setSearchTerm(input)}
								handleSort={(label: string, orderDirection: string) => {
									setOrderByField(label);
									setOrderDirection(orderDirection);
								}}
							/>
						)}
					</div>
				</div>
				<div className='mb-[25px] flex w-full justify-center sm:hidden'>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<div className='w-[95%]'>
							<ResponsiveProjectsTable
								totalNumberOfProjects={totalNumberOfProjects}
								projects={projects}
								value={searchTerm}
								orderByField={orderByField}
								orderDirection={orderDirection}
								handleSearch={input => setSearchTerm(input)}
								handleSort={(label: string, orderDirection: string) => {
									setOrderByField(label);
									setOrderDirection(orderDirection);
								}}
							/>
						</div>
					)}
				</div>

				<div className='mx-3 mb-[25px] block'>
					<Pagination
						totalNumberOfProjects={totalNumberOfProjects}
						currentPage={currentPage}
						lastPage={lastPage}
						projectsPerPage={projectsPerPage}
						handleProjectsPerPage={projectsPerPage => {
							setProjectsPerPage(projectsPerPage);
							setCurrentPage(1);
							setSearchTerm('');
						}}
						handlePageChange={pageNumber => setCurrentPage(pageNumber)}
					/>
				</div>
			</MainLayout>
		</>
	);
};

export default Projects;
