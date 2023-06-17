import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import AuthContext from "src/shared/context/auth-context";
import LoadingSpinner from "src/shared/components/utils/LoadingSpinner";
import Navbar from "src/shared/components/navbar/Navbar";
import MainLayout from "src/shared/components/layout/MainLayout";
import ProjectsTable from "src/components/projects/table/ProjectsTable";
import Pagination from "src/components/projects/pagination/Pagination";
import NewProject from "./NewProject";

const navLabels = ["All Projects", "Active", "On hold", "Inactive", "Completed"];

type ProjectType = "Fixed" | "OnGoing";

type SalesChannel = "Online" | "InPerson" | "Referral" | "Other";

type ProjectStatus = "Active" | "OnHold" | "Inactive" | "Completed";

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
  const [projectStatus, setProjectStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);
  const [orderByField, setOrderByField] = useState("startDate");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [openModal, setOpenModal] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/projects?name=${searchTerm}&projectStatus=${projectStatus}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${projectsPerPage}&page=${currentPage}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setProjects(response.data.projects);
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
    if (activePage === 1) setProjectStatus("");
    else if (activePage === 2) setProjectStatus("Active");
    else if (activePage === 3) setProjectStatus("OnHold");
    else if (activePage === 4) setProjectStatus("Inactive");
    else if (activePage === 5) setProjectStatus("Completed");
  }, [activePage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <MainLayout activeMenuItem={"projects"}>
        <div className='mx-14 mb-[17px] mt-[34px]'>
          <div className='mb-[30px] flex items-center justify-between'>
            <h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Projects</h1>
            <button
              className={`rounded-md px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white ${
                user?.role === "Admin" ? "bg-deep-teal hover:saturate-[400%]" : "cursor-not-allowed bg-whispering-gray"
              }`}
              disabled={user?.role !== "Admin"}
              onClick={openModalHandler}
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
                  setOrderByField("startDate");
                  setOrderDirection("desc");
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
                handleSearch={(input) => setSearchTerm(input)}
                handleSort={(label: string, orderDirection: string) => {
                  setOrderByField(label);
                  setOrderDirection(orderDirection);
                }}
                handleDeleteProject={(projectId: string) => {}}
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
      {openModal && (
        <NewProject
          onClose={() => setOpenModal(false)}
          handleConfirmation={(employees: EmployeesPerProject[]) => {}}
          children={undefined}
        />
      )}
    </>
  );
};

export default Projects;
