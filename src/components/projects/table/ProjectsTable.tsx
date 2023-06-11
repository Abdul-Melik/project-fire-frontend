import { useContext, useState } from "react";

import TableHeader from "src/shared/components/table-elements/TableHeader";
import TableHead from "src/shared/components/table-elements/TableHead";
import TableRow from "src/shared/components/table-elements/TableRow";
import Avatars from "src/components/projects/table/Avatars";
import DeleteModal from "src/shared/components/menus/modals/DeleteModal";
import ProjectInfoModal from "src/shared/components/menus/modals/InfoModal";
import UpdateModal from "src/shared/components/menus/modals/UpdateModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "src/shared/context/auth-context";

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

type Props = {
  totalNumberOfProjects: number;
  projects: Project[];
  value: string;
  orderByField: string;
  orderDirection: string;
  handleSearch: (input: string) => void;
  handleSort: (label: string, orderDirection: string) => void;
  handleDeleteProject: (projectId: string) => void;
};

const getProjectDate = (project: Project) => {
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const startDateString = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  const endDateString = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  return { startDateString, endDateString };
};

const getProjectValueBAM = (project: Project) => {
  return project.projectValueBAM.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getProjectColorAndStatus = (project: Project) => {
  const projectStatus = project.projectStatus;
  if (projectStatus === "Active") return { color: "bg-spring-fern", status: "Active" };
  else if (projectStatus === "OnHold") return { color: "bg-golden-tangerine", status: "On hold" };
  else if (projectStatus === "Inactive") return { color: "bg-silver-mist", status: "Inactive" };
  else return { color: "bg-cerulean-breeze", status: "Completed" };
};

const ProjectsTable = ({
  totalNumberOfProjects,
  projects,
  value,
  orderByField,
  orderDirection,
  handleSearch,
  handleSort,
  handleDeleteProject,
}: Props) => {
  const { user } = useContext(AuthContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openDeleteModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsDeleteModalOpen(true);
  };

  const openInfoModal = (project: Project) => {
    setSelectedProject(project);
    setIsInfoModalOpen(true);
  };

  const openUpdateModal = (project: Project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };

  const columns = [
    { name: "Name", label: "name" },
    { name: "Description", label: "description" },
    { name: "Duration", label: "startDate" },
    { name: "Developers", label: "employeesCount" },
    { name: "Hourly rate", label: "hourlyRate" },
    { name: "Project value in BAM", label: "projectValueBAM" },
    { name: "Status", label: "projectStatus" },
  ];

  if (user && user.role === "Admin") {
    columns.push({ name: "Actions", label: "projectActions" });
  }

  return (
    <div className='w-full rounded-md border border-ashen-grey bg-white'>
      <TableHeader label='Projects Table' total={totalNumberOfProjects} value={value} handleSearch={handleSearch} />
      <table className='w-full border-t border-ashen-grey'>
        <TableHead
          columns={columns}
          orderByField={orderByField}
          orderDirection={orderDirection}
          handleSort={handleSort}
        />
        <tbody>
          {projects.map((project) => {
            const projectId = project.id;
            const employees = project.employees.map((employeeObj) => employeeObj.employee);
            let names:
              | {
                  firstName: string;
                  lastName: string;
                }[]
              | undefined;
            let images: (string | undefined)[] | undefined;
            if (employees) {
              names = employees.map((employee) => ({
                firstName: employee.firstName,
                lastName: employee.lastName,
              }));
              images = employees.map((employee) => employee.image);
            } else {
              names = [];
              images = [];
            }
            return (
              <TableRow
                key={projectId}
                className='duration-300 hover:-translate-x-2 hover:-translate-y-1 hover:transform hover:cursor-pointer hover:bg-white hover:shadow-md hover:transition-transform'
              >
                <td className='w-[150px] pl-4'>{project.name}</td>
                <td className='line-clamp-1 w-[150px] text-ellipsis pl-4'>{project.description}</td>
                <td className='w-[150px] pl-4'>
                  {getProjectDate(project).startDateString} - {getProjectDate(project).endDateString}
                </td>
                <td className='w-[150px] pl-4'>
                  <Avatars names={names} images={images} />
                </td>
                <td className='w-[150px] pl-4'>${project.hourlyRate}</td>
                <td className='w-[230px] pl-4'>${getProjectValueBAM(project)} KM</td>
                <td className='flex h-[60px] w-[150px] items-center gap-2 pl-4'>
                  <div className={`h-[6px] w-[6px] rounded-full ${getProjectColorAndStatus(project).color}`} />
                  <div className='font-gilroy-semi-bold font-semibold'>{getProjectColorAndStatus(project).status}</div>
                </td>
                {user?.role === "Admin" && (
                  <>
                    <td className='w-[150px] pl-4'>
                      <div className='flex'>
                        <div className='group relative'>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className='ml-1 mr-1 cursor-pointer text-ellipsis text-lg hover:text-blue-500 group-hover:text-blue-500'
                            onClick={() => openUpdateModal(project)}
                          />
                          <span className='absolute left-1/2 top-full -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                            Edit
                          </span>
                        </div>
                        <div className='group relative'>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className='ml-1 mr-1 cursor-pointer text-ellipsis text-lg hover:text-blue-500 group-hover:text-blue-500'
                            onClick={() => openDeleteModal(projectId)}
                          />
                          <span className='absolute left-1/2 top-full -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                            Delete
                          </span>
                        </div>

                        <div className='group relative'>
                          <FontAwesomeIcon
                            icon={faEye}
                            className='ml-1 mr-1 cursor-pointer text-ellipsis text-lg hover:text-blue-500 group-hover:text-blue-500'
                            onClick={() => openInfoModal(project)}
                          />
                          <span className='absolute left-1/2 top-full -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                            View
                          </span>
                        </div>
                      </div>
                    </td>
                  </>
                )}
              </TableRow>
            );
          })}
        </tbody>
      </table>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteProject(selectedProjectId || "")}
          projectId={selectedProjectId || ""}
        />
      )}
      {isInfoModalOpen && selectedProject && (
        <ProjectInfoModal project={selectedProject} onClose={() => setIsInfoModalOpen(false)} />
      )}
      {isUpdateModalOpen && selectedProject && (
        <UpdateModal project={selectedProject} onClose={() => setIsUpdateModalOpen(false)} />
      )}
    </div>
  );
};

export default ProjectsTable;
