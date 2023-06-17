import { useContext, useState } from "react";

import TableHeader from "src/shared/components/table-elements/TableHeader";
import TableHead from "src/shared/components/table-elements/TableHead";
import TableRow from "src/shared/components/table-elements/TableRow";
import Avatars from "src/components/projects/table/Avatars";

import AuthContext from "src/shared/context/auth-context";
import InfoModal from "src/shared/components/menus/modals/InfoModal";

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

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openInfoModal = (project: Project) => {
    setSelectedProject(project);
    setIsInfoModalOpen(true);
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
                onClick={() => user?.role === "Admin" && openInfoModal(project)}
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
              </TableRow>
            );
          })}
        </tbody>
      </table>
      {isInfoModalOpen && selectedProject && (
        <InfoModal
          project={selectedProject}
          handleDeleteProject={handleDeleteProject}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectsTable;
