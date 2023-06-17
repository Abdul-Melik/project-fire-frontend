import React, { useContext, useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import axios from "axios";

import { arrow } from "src/assets/media";
import AuthContext from "src/shared/context/auth-context";
import InputField from "src/shared/components/form-elements/InputField";
import TextArea from "src/shared/components/form-elements/TextArea";
import DateInput from "src/shared/components/form-elements/DateInput";
import NumberInput from "src/shared/components/form-elements/NumberInput";
import Radio from "src/shared/components/form-elements/Radio";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import EmployeesTable from "src/components/projects/table/EmployeesTable";
import Modal from "src/shared/components/utils/Modal";
import StartDateInput from "src/shared/components/form-elements/StartDateInput";
import EndDateInput from "src/shared/components/form-elements/EndDateInput";
import DropdownSelector from "src/shared/components/utils/DropdownSelector";
import CurrencySelector from "src/shared/components/utils/CurrencySelector";
import WorkTimeSelector from "src/shared/components/utils/WorkTimeSelector";
import { useNavigate } from "react-router-dom";
import EmployeeDropdownSelector from "src/shared/components/utils/EmployeeDropdownSelector";
import BackdropFilter from "src/shared/components/menus/po-createnewproject/BackdropFilter";
import BackButton from "src/shared/components/menus/po-createnewproject/BackButton";
import PageHeader from "src/shared/components/menus/po-createnewproject/PageHeader";
import ProjectForm from "src/shared/components/menus/po-createnewproject/ProjectForm";
import FormButtons from "src/shared/components/menus/po-createnewproject/FormButtons";
import ButtonType from "src/shared/components/menus/po-createnewproject/ButtonType";
import ModalContent from "src/shared/components/menus/po-createnewproject/ModalContent";

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

type Props = {
  onClose: () => void;
  handleConfirmation: (employees: EmployeesPerProject[]) => void;
  children: React.ReactNode;
};

const NewProject = ({ onClose, handleConfirmation }: Props) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateValueType | null>(null);
  const [startDate, setStartDate] = useState<DateValueType | null>(null);
  const [endDate, setEndDate] = useState<DateValueType | null>(null);
  const [actualEndDate, setActualEndDate] = useState<DateValueType | null>(null);
  const [projectType, setProjectType] = useState<ProjectType>("Fixed");
  const [salesChannel, setSalesChannel] = useState<SalesChannel>("Online");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [projectStatus, setProjectStatus] = useState("Active");
  const [projectValue, setProjectValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [employeesOnProject, setEmployeesOnProject] = useState<EmployeesPerProject[]>([]);
  const [confirmData, setConfirmData] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleFormSubmit = async () => {
    try {
      const requestData = {
        name,
        description,
        startDate: startDate?.startDate,
        endDate: endDate?.endDate,
        projectType,
        hourlyRate,
        projectValueBAM: projectValue,
        salesChannel,
        projectStatus,
        employeesOnProject: employeesOnProject.map((employeeObj) => ({
          employeeId: employeeObj.employee.id,
          partTime: employeeObj.partTime,
        })),
      };

      await axios.post(`${baseUrl}/api/projects`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      window.location.reload();
    } catch (error: any) {
      toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
    }
  };

  const handleDropSelect = (drop: string) => {
    if (!selectedEmployees.includes(drop)) {
      setSelectedEmployees((prevSelectedEmployees) => [...prevSelectedEmployees, drop]);
    }
  };

  const onCancel = () => {
    onClose();
  };

  return (
    <>
      <BackdropFilter bgColor='bg-[#1a2e2b]' backdropBlur='backdrop-blur-[2px]'>
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
                  value={null}
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
                label='Add Project'
                type='button'
                onClick={handleFormSubmit}
              />
            </FormButtons>
          </div>
        </ModalContent>
      </BackdropFilter>
    </>
  );
};

export default NewProject;
