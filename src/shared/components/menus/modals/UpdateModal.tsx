import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import axios from "axios";

import AuthContext from "src/shared/context/auth-context";
import InputField from "src/shared/components/form-elements/InputField";
import TextArea from "src/shared/components/form-elements/TextArea";
import NumberInput from "src/shared/components/form-elements/NumberInput";
import StartDateInput from "../../form-elements/StartDateInput";
import EndDateInput from "../../form-elements/EndDateInput";
import CurrencySelector from "../../utils/CurrencySelector";
import DropdownSelector from "../../utils/DropdownSelector";
import EmployeeDropdownSelector from "../../utils/EmployeeDropdownSelector";
import FormButtons from "../po-createnewproject/FormButtons";
import ProjectForm from "../po-createnewproject/ProjectForm";
import ButtonType from "../po-createnewproject/ButtonType";
import PageHeader from "../po-createnewproject/PageHeader";
import BackButton from "../po-createnewproject/BackButton";
import ModalContent from "../po-createnewproject/ModalContent";

type ProjectType = "Fixed" | "OnGoing";

type SalesChannel = "Online" | "InPerson" | "Referral" | "Other";

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

type UpdateModalProps = {
  project: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    actualEndDate: string;
    projectType: "Fixed" | "OnGoing";
    hourlyRate: number;
    projectValueBAM: number;
    salesChannel: "Online" | "InPerson" | "Referral" | "Other";
    projectStatus: "Active" | "OnHold" | "Inactive" | "Completed";
    employees: {
      partTime: boolean;
      employee: {
        id: string;
        firstName: string;
        lastName: string;
        image: string;
        department: string;
        salary: number;
        techStack: string[];
      };
    }[];
  };
  onClose: () => void;
};

const UpdateModal: React.FC<UpdateModalProps> = ({ project, onClose }) => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: project.startDate,
    endDate: project.endDate,
  });
  const [startDate, setStartDate] = useState<DateValueType>({
    startDate: project.startDate,
    endDate: project.startDate,
  });
  const [endDate, setEndDate] = useState<DateValueType>({
    startDate: project.endDate,
    endDate: project.endDate,
  });
  const [actualEndDate, setActualEndDate] = useState<DateValueType>({
    startDate: project.actualEndDate,
    endDate: project.actualEndDate,
  });
  const [projectType, setProjectType] = useState<ProjectType>(project.projectType);
  const [salesChannel, setSalesChannel] = useState<SalesChannel>(project.salesChannel);
  const [hourlyRate, setHourlyRate] = useState(project.hourlyRate);
  const [projectStatus, setProjectStatus] = useState(project.projectStatus);
  const [projectValue, setProjectValue] = useState(project.projectValueBAM);
  const [openModal, setOpenModal] = useState(false);
  const [employeesOnProject, setEmployeesOnProject] = useState<EmployeesPerProject[]>(
    project.employees.map((employeeObj) => ({
      partTime: employeeObj.partTime,
      employee: employeeObj.employee,
    }))
  );
  const [confirmData, setConfirmData] = useState(false);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeesPerProject[]>(
    project.employees.map((employeeObj) => ({
      partTime: employeeObj.partTime,
      employee: employeeObj.employee,
    }))
  );
  const [employees, setEmployees] = useState<Employee[]>([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleFormSubmit = async () => {
    try {
      await axios.patch(
        `${baseUrl}/api/projects/${project.id}`,
        {
          name,
          description,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          actualEndDate: actualEndDate?.startDate,
          projectType,
          hourlyRate,
          projectValueBAM: projectValue,
          salesChannel,
          projectStatus,
          employeesOnProject: employeesOnProject.map((employeeObj) => ({
            employeeId: employeeObj.employee.id,
            partTime: employeeObj.partTime,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      window.location.reload();
    } catch (error: any) {
      toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
    }
  };

  const handleDropSelect = (drop: string) => {
    const employeeExists = selectedEmployees.find((employee) => employee.employee.id === drop);

    if (!employeeExists) {
      const employeeToAdd = allEmployees.find((employee) => employee.id === drop);
      if (employeeToAdd) {
        setSelectedEmployees((prevSelectedEmployees) => [
          ...prevSelectedEmployees,
          {
            partTime: false,
            employee: employeeToAdd,
          },
        ]);
      }
    } else {
      setSelectedEmployees((prevSelectedEmployees) =>
        prevSelectedEmployees.filter((employeeObj) => employeeObj.employee.id !== drop)
      );
    }
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <>
      <ModalContent>
        <div className=' flex w-full flex-col'>
          <BackButton onClick={onClose} text='Back' />

          <div className='w-full '>
            <PageHeader title='Add New Project' />

            <ProjectForm onSubmit={handleFormSubmit}>
              <InputField
                label='Name'
                htmlFor='name'
                type='text'
                id='name'
                value={name}
                placeholder='Project name'
                handleInput={(name) => {
                  setName(name);
                }}
              />
              <TextArea
                label='Description'
                htmlFor='description'
                required
                id='description'
                value={description}
                placeholder='Project description'
                handleInput={(description) => setDescription(description)}
              />
              <div>
                <label className='block font-gilroy-medium text-base font-medium leading-5 text-[#292929] '>
                  Duration
                </label>
                <div className='flex items-center'>
                  <StartDateInput
                    className='flex-1'
                    label=''
                    value={startDate}
                    placeholder='Start Date'
                    handleChange={(value) => setStartDate(value)}
                  />
                  <span className='mx-4 font-gilroy-regular text-lg font-normal leading-6 text-black'>-</span>
                  <EndDateInput
                    className='flex-1'
                    label=''
                    value={endDate}
                    placeholder='End Date'
                    handleChange={(value) => setEndDate(value)}
                  />
                </div>
              </div>
              <EmployeeDropdownSelector
                label='Assign Developers'
                placeholder='Select team members working on this project'
                options={employees.map((employee) => employee.id)}
                value={selectedEmployees.map((employee) => employee.employee.id)}
                handleDropSelect={handleDropSelect}
                handleConfirmation={(employees: EmployeesPerProject[]) => {
                  setEmployeesOnProject(employees);
                  setOpenModal(false);
                  setConfirmData(false);
                }}
              />

              <div>
                <label className='block'>Hourly Rate</label>
                <div className='flex items-center'>
                  <NumberInput
                    label=''
                    info=''
                    htmlFor='hourly-rate'
                    required
                    id='hourly-rate'
                    placeholder='Enter the amount'
                    value={hourlyRate}
                    handleInput={(e) => setHourlyRate(Number(e.target.value))}
                  />
                  <CurrencySelector label='' options={["USD", "EUR", "BAM"]} defaultValue='USD' />
                </div>
              </div>
              <NumberInput
                label='Project Value (BAM)'
                info=''
                htmlFor='project-value'
                required
                id='project-value'
                placeholder='Enter the amount in BAM'
                value={projectValue}
                handleInput={(e) => setProjectValue(Number(e.target.value))}
              />
              <DropdownSelector
                type='radio'
                placeholder=''
                label='Status'
                value={projectStatus}
                options={["Active", "OnHold", "Inactive", "Completed"]}
                handleDropSelect={(drop) => setProjectStatus(drop as "Active" | "OnHold" | "Inactive" | "Completed")}
              />
            </ProjectForm>
          </div>
          <FormButtons>
            <ButtonType
              bgColor='bg-white'
              textColor='text-deep-teal '
              borderColor='border-deep-teal'
              label='Cancel'
              onClick={onCancel}
              type='button'
            />
            <ButtonType
              bgColor='bg-deep-teal'
              textColor='text-white'
              borderColor='border-deep-teal'
              label='Edit Project'
              type='button'
              onClick={handleFormSubmit}
            />
          </FormButtons>
        </div>
      </ModalContent>
    </>
  );
};

export default UpdateModal;
