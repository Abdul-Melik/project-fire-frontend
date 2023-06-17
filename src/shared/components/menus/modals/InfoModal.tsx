import React, { useState } from "react";

import InfoSelector from "../../utils/InfoSelector";
import StatusSelector from "../../utils/StatusSelector";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import BackdropFilter from "../po-createnewproject/BackdropFilter";
import BackButton from "../po-createnewproject/BackButton";
import PageHeader from "../po-createnewproject/PageHeader";
import ProjectForm from "../po-createnewproject/ProjectForm";
import FormButtons from "../po-createnewproject/FormButtons";
import ButtonType from "../po-createnewproject/ButtonType";
import ModalContent from "../po-createnewproject/ModalContent";

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

type InfoModalProps = {
  onClose: () => void;
  project: Project;
  handleDeleteProject: (projectId: string) => void;
};

const InfoModal: React.FC<InfoModalProps> = ({ onClose, project, handleDeleteProject }) => {
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleExpand = (employeeId: string) => {
    setExpandedEmployee(employeeId === expandedEmployee ? null : employeeId);
  };

  const openDeleteModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = () => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <BackdropFilter bgColor='bg-[#142E2B]' backdropBlur='backdrop-blur-[6px]'>
        <ModalContent>
          <BackButton onClick={onClose} text='Back' />
          <div className='w-full'>
            <PageHeader title='Add New Project' />
            <ProjectForm>
              <div>
                <InfoSelector label='Name' p={[project.name]} />
                <hr className='my-3 w-full border-[#DFE3E1]' />
                <InfoSelector label='Description' p={[project.description]} />
                <hr className='my-3 w-full border-[#DFE3E1]' />
                <InfoSelector
                  label='Duration'
                  p={[
                    `${new Date(project.startDate).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })} - ${new Date(project.endDate).toLocaleString("en-US", { month: "long", year: "numeric" })}`,
                  ]}
                />
                <hr className='my-3 w-full border-[#DFE3E1]' />
                <InfoSelector
                  label='Team members'
                  p={[
                    project.employees
                      .map((employeeObj) => `${employeeObj.employee.firstName} ${employeeObj.employee.lastName}`)
                      .join(", "),
                  ]}
                />
                <hr className='my-3 w-full border-[#DFE3E1]' />
                <InfoSelector label='Hourly Rate (USD)' p={[project.hourlyRate.toFixed(2)]} />
                <hr className='my-3 w-full border-[#DFE3E1]' />
                <InfoSelector
                  label='Project Value (BAM)'
                  p={[
                    project.projectValueBAM.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                  ]}
                />
                <hr className='my-3 w-full border-[#DFE3E1]' />
                <StatusSelector label='Status' p={[project.projectStatus]} />
              </div>
            </ProjectForm>
          </div>
          <div className='absolute bottom-0 w-full'>
            <FormButtons>
              <ButtonType
                bgColor='bg-white'
                textColor='text-[#FF4D4F]'
                borderColor='border-[#FF4D4F]'
                label='Delete Project'
                onClick={() => openDeleteModal(project.id)}
                type='button'
              />
              <ButtonType
                bgColor='bg-deep-teal'
                textColor='text-white'
                borderColor='border-deep-teal'
                label='Edit Project'
                type='submit'
                onClick={() => openUpdateModal()}
              />
            </FormButtons>
          </div>
        </ModalContent>
        {isDeleteModalOpen && (
          <DeleteModal
            color='bg-[#FF4D4F]'
            confirmButtonText='Delete'
            alertDescription={`This will permanently delete ${selectedProject?.name} and all associated data. You cannot undo this action.`}
            alertTitle={`Are you sure you want to delete ${selectedProject?.name}?`}
            isOpen={isDeleteModalOpen}
            cancelButtonText="Don't delete"
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => handleDeleteProject(selectedProjectId || "")}
            projectId={selectedProjectId || ""}
          />
        )}
        {isUpdateModalOpen && selectedProject && (
          <UpdateModal project={selectedProject} onClose={() => setIsUpdateModalOpen(false)} />
        )}
      </BackdropFilter>
    </>
  );
};

export default InfoModal;
