import { useContext, useState } from "react";
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
import Modal from "../../utils/Modal";
import EmployeesTable from "src/components/projects/table/EmployeesTable";
import YearSelector from "../../utils/YearSelector";

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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
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

  return (
    <>
      {openModal && (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-gray-600 bg-opacity-50'>
          <Modal
            className='z-50 overflow-hidden rounded-md bg-white shadow-md'
            header='Choose Employees For Project'
            show={openModal}
            handleConfirmation={() => {
              setConfirmData(true);
            }}
            handleCancellation={() => {
              setOpenModal(false);
              setSelectedRows([]);
              setSelectedCheckboxes([]);
              setEmployeesOnProject([]);
              setConfirmData(false);
            }}
          >
            <EmployeesTable
              confirmData={confirmData}
              selectedRows={selectedRows}
              selectedCheckboxes={selectedCheckboxes}
              handleConfirmation={(employees: EmployeesPerProject[]) => {
                setEmployeesOnProject(employees);
                setOpenModal(false);
                setConfirmData(false);
              }}
              handleRowsSelection={(rows) => setSelectedRows(rows)}
              handleCheckboxesSelection={(checkboxes) => setSelectedCheckboxes(checkboxes)}
            />
          </Modal>
        </div>
      )}
      <div className='fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50'>
        <div className='absolute w-9/12 rounded-md bg-white p-4'>
          <button className='absolute right-0 top-0 p-4 pr-6 hover:text-red-900' onClick={onClose}>
            <FontAwesomeIcon className='text-xl' icon={faTimes} />
          </button>
          <div className='mx-14 my-[34px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='mb-[30px] font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>
                  Edit Project
                </h1>
              </div>
              <div className='mb-[30px]'>
                <YearSelector
                  label='Status'
                  options={["Active", "OnHold", "Inactive", "Completed"]}
                  defaultValue='Active'
                  handleYearSelect={(year) => setProjectStatus(year as "Active" | "OnHold" | "Inactive" | "Completed")}
                />
              </div>
            </div>
            <form className='flex flex-col items-center justify-center gap-4 text-base' onSubmit={handleFormSubmit}>
              <div className='flex w-full flex-col gap-4 rounded-md border border-misty-lavender p-3'>
                <div className='flex h-full w-full gap-4'>
                  <div className='flex flex-1 flex-col gap-4'>
                    <InputField
                      label='Name'
                      htmlFor='name'
                      type='text'
                      id='name'
                      value={name}
                      placeholder='Enter project name'
                      handleInput={(name) => setName(name)}
                    />
                    <TextArea
                      label='Description'
                      htmlFor='description'
                      required
                      id='description'
                      value={description}
                      placeholder='Enter project description'
                      handleInput={(description) => setDescription(description)}
                    />
                  </div>
                  <div className='flex flex-1 flex-col gap-4'>
                    <div className='flex flex-1 flex-col gap-[10px]'>
                      <div className='font-gilroy-medium font-medium text-midnight-grey'>Project Type</div>
                      <div className='flex items-center justify-center gap-6 rounded-md border border-misty-lavender p-3'>
                        <Radio
                          htmlFor='fixed'
                          label='Fixed'
                          checked={projectType === "Fixed"}
                          id='fixed'
                          name='project-type'
                          value={"Fixed"}
                          handleChange={(event) => setProjectType(event.target.value as ProjectType)}
                        />
                        <Radio
                          htmlFor='on-going'
                          label='On-going'
                          checked={projectType === "OnGoing"}
                          id='on-going'
                          name='project-type'
                          value={"OnGoing"}
                          handleChange={(event) => setProjectType(event.target.value as ProjectType)}
                        />
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col gap-[10px]'>
                      <div className='font-gilroy-medium font-medium text-midnight-grey'>Sales Channel</div>
                      <div className='flex items-center justify-center gap-6 rounded-md border border-misty-lavender p-3'>
                        <Radio
                          htmlFor='online'
                          label='Online'
                          checked={salesChannel === "Online"}
                          id='online'
                          name='sales-channel'
                          value={"Online"}
                          handleChange={(event) => setSalesChannel(event.target.value as SalesChannel)}
                        />
                        <Radio
                          htmlFor='in-person'
                          label='In-person'
                          checked={salesChannel === "InPerson"}
                          id='in-person'
                          name='sales-channel'
                          value={"InPerson"}
                          handleChange={(event) => setSalesChannel(event.target.value as SalesChannel)}
                        />
                        <Radio
                          htmlFor='refferal'
                          label='Refferal'
                          checked={salesChannel === "Referral"}
                          id='refferal'
                          name='sales-channel'
                          value={"Referral"}
                          handleChange={(event) => setSalesChannel(event.target.value as SalesChannel)}
                        />
                        <Radio
                          htmlFor='other'
                          label='Other'
                          checked={salesChannel === "Other"}
                          id='other'
                          name='sales-channel'
                          value={"Other"}
                          handleChange={(event) => setSalesChannel(event.target.value as SalesChannel)}
                        />
                      </div>
                    </div>
                    <div className='flex w-full gap-4'>
                      <NumberInput
                        label='Hourly Rate'
                        info=' (in USD)'
                        htmlFor='hourly-rate'
                        required
                        id='hourly-rate'
                        step={0.01}
                        min={0}
                        value={hourlyRate}
                        handleInput={(e) => setHourlyRate(Number(e.target.value))}
                      />
                      <NumberInput
                        label='Project Value'
                        info=' (in BAM)'
                        htmlFor='project-value'
                        required
                        id='project-value'
                        step={1}
                        min={0}
                        value={projectValue}
                        handleInput={(e) => setProjectValue(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex w-full gap-4'>
                  <DateInput
                    className='flex-1'
                    label='Start & End Dates'
                    seperator='-'
                    value={dateRange}
                    placeholder='Stard Date - End Date'
                    handleChange={(value) => setDateRange(value)}
                  />
                  <DateInput
                    className='flex-1'
                    label='Actual End Date (Optional)'
                    asSingle
                    value={actualEndDate}
                    placeholder='Actual End Date'
                    handleChange={(value) => setActualEndDate(value)}
                  />
                </div>
              </div>
              <div className='flex w-2/3 gap-4 self-start font-gilroy-semi-bold font-semibold'>
                <div
                  className='relative flex flex-1 items-center justify-center rounded-md bg-golden-tangerine px-4 py-2 text-midnight-grey hover:cursor-pointer hover:saturate-150'
                  onClick={() => setOpenModal(true)}
                >
                  Add employees{" "}
                  {employeesOnProject.length > 0 && (
                    <img
                      src={arrow}
                      className='absolute right-0 mr-3 mt-1'
                      onClick={(event) => {
                        event.stopPropagation();
                        setShowEmployeeList(!showEmployeeList);
                      }}
                    />
                  )}
                  {showEmployeeList && employeesOnProject.length > 0 && (
                    <div className='absolute left-0 right-0 top-full mt-2  max-h-40 overflow-y-auto rounded-md bg-gray-100 text-center shadow-md'>
                      {employeesOnProject.map((employeeObj) => (
                        <div key={employeeObj.employee.id} className='cursor-default p-2 hover:bg-gray-100'>
                          {employeeObj.employee.firstName} {employeeObj.employee.lastName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className='flex-1 rounded-md bg-deep-teal px-[10px] py-3 text-white hover:saturate-[400%]'
                  type='submit'
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
