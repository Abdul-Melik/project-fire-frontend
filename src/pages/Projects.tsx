import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import AuthContext from "src/shared/context/auth-context";
import LoadingSpinner from "src/shared/components/utils/LoadingSpinner";
import Navbar from "src/shared/components/navbar/Navbar";
import MainLayout from "src/shared/components/layout/MainLayout";
import Pagination from "src/components/projects/pagination/Pagination";
import ProjectsTable from "src/components/projects/table/ProjectsTable";
import { get } from "http";

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  actualEndDate?: Date;
  projectType: string;
  hourlyRate: number;
  projectValueBAM: number;
  salesChannel: string;
  projectStatus: string;
  finished: boolean;
  employees: {
    employee: string;
    fullTime: boolean;
  }[];
}

interface UsersPerProject {
  id: string;
  name: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    image?: string;
    employee: string;
  }[];
}

const Projects = () => {
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [projectStatus, setProjectStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);
  const [usersPerProject, setUsersPerProject] = useState<UsersPerProject[]>([]);
  const [sortBy, setSortBy] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedColumn, setSelectedColumn] = useState("startDate");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const getProjectsAndUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const projectsResponse = await axios.get(
        `${baseUrl}/api/projects?name=${searchTerm}&projectStatus=${projectStatus}&limit=${projectsPerPage}&page=${currentPage}&orderBy=${sortBy}&order=${sortOrder}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setProjects(projectsResponse.data.projects);
      setTotalNumberOfProjects(projectsResponse.data.pageInfo.total);
      setLastPage(projectsResponse.data.pageInfo.lastPage);

      const usersPerProjectResponse = await axios.get(`${baseUrl}/api/projects/users-per-project`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsersPerProject(usersPerProjectResponse.data);
    } catch (error: any) {
      toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
    }
    setIsLoading(false);
  }, [token, searchTerm, projectStatus, projectsPerPage, currentPage, sortBy, sortOrder]);

  useEffect(() => {
    if (token) getProjectsAndUsers();
  }, [token, searchTerm, projectStatus, projectsPerPage, currentPage, sortBy, sortOrder, getProjectsAndUsers]);

  useEffect(() => {
    if (activePage === 1) setProjectStatus("");
    else if (activePage === 2) setProjectStatus("active");
    else if (activePage === 3) setProjectStatus("on-hold");
    else if (activePage === 4) setProjectStatus("inactive");
    else if (activePage === 5) setProjectStatus("completed");
  }, [activePage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navLabels = ["All Projects", "Active", "On hold", "Inactive", "Completed"];

  const handleSort = (sortByLabel: string, sortLabel: string) => {
    setSortBy(sortByLabel);
    setSortOrder(sortLabel);
    setSelectedColumn(sortByLabel);
    console.log(selectedColumn);
    getProjectsAndUsers();
  };
  return (
    <>
      <MainLayout activeMenuItem={"projects"}>
        <div className='mx-14 mb-[17px] mt-[34px]'>
          <div className='mb-[30px] flex items-center justify-between'>
            <h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</h1>
            <button
              className={`rounded-md px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] ${
                user?.role === "admin" ? "bg-deep-teal" : "cursor-not-allowed bg-gray-400"
              } text-white hover:saturate-[400%]`}
              onClick={() => navigate("/projects/create")}
              disabled={user?.role !== "admin"}
            >
              Create new project
            </button>
          </div>
          <div className='flex flex-col'>
            <div className='mb-[30px]'>
              <Navbar
                navLabels={navLabels}
                handlePageSelect={(pageNumber) => {
                  setActivePage(pageNumber);
                  setProjectsPerPage(10);
                  setCurrentPage(1);
                  setSearchTerm("");
                }}
              />
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <ProjectsTable
                totalNumberOfProjects={totalNumberOfProjects}
                projects={projects}
                usersPerProject={usersPerProject}
                value={searchTerm}
                handleSearch={(input) => setSearchTerm(input)}
                handleSort={handleSort}
                selectedColumn={selectedColumn}
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
            handleProjectsPerPage={(projectsPerPage) => {
              setProjectsPerPage(projectsPerPage);
              setCurrentPage(1);
              setSearchTerm("");
            }}
            handlePageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default Projects;
