import { useState, useRef, useEffect, useContext, useCallback } from "react";
import WorkTimeSelector from "./WorkTimeSelector";
import AuthContext from "src/shared/context/auth-context";
import { toast } from "react-toastify";
import axios from "axios";

import { arrow } from "src/assets/media";

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
  handleDropSelect: (drop: string) => void;
  label: string;
  placeholder: string;
  options: string[];
  value: string[] | null;
  handleConfirmation: (employees: EmployeesPerProject[]) => void;
};

const EmployeeDropdownSelector = ({
  handleDropSelect,
  handleConfirmation,
  label,
  options,
  value,
  placeholder,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const [selectedDrop, setSelectedDrop] = useState<string[]>(value || []);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    const index = selectedDrop.indexOf(option);
    if (index > -1) {
      setSelectedDrop((prevSelectedDrop) => prevSelectedDrop.filter((item) => item !== option));
      setSelectedEmployees((prevSelectedEmployees) => prevSelectedEmployees.filter((employee) => employee !== option));
    } else {
      setSelectedDrop((prevSelectedDrop) => [...prevSelectedDrop, option]);
      setSelectedEmployees((prevSelectedEmployees) => [...prevSelectedEmployees, option]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/employees?firstName=${searchTerm}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAllEmployees(response.data);
    } catch (error: any) {
      toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
    }
    setIsLoading(false);
  }, [baseUrl, searchTerm, token]);

  const getAllEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/employees`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAllEmployees(response.data);
    } catch (error: any) {
      toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
    }
    setIsLoading(false);
  }, [baseUrl, token]);

  useEffect(() => {
    if (token) getAllEmployees();
  }, [getAllEmployees, token]);

  useEffect(() => {
    if (token) getEmployees();
  }, [getEmployees, token, searchTerm]);

  useEffect(() => {
    if (allEmployees.length > 0) {
      const employeesOnProject: EmployeesPerProject[] = selectedDrop.reduce((result: EmployeesPerProject[], id) => {
        const employee = allEmployees.find((employee) => employee.id === id);
        if (employee) {
          result.push({ employee, partTime: false });
        }
        return result;
      }, []);
      handleConfirmation(employeesOnProject);
    }
  }, [allEmployees, selectedDrop]);

  const handleDropSelectNew = (drop: string) => {
    if (!selectedDrop.includes(drop)) {
      setSelectedDrop((prevSelectedDrop) => [...prevSelectedDrop, drop]);
    }
  };

  const handleRemoveEmployeeNew = (employee: string) => {
    setSelectedEmployees((prevSelectedEmployees) => prevSelectedEmployees.filter((emp) => emp !== employee));
    setSelectedDrop((prevSelectedDrop) => prevSelectedDrop.filter((item) => item !== employee));
  };

  useEffect(() => {
    setSelectedEmployees(selectedDrop);
  }, [selectedDrop]);

  return (
    <div className='flex w-full flex-col items-start gap-2'>
      <label
        className='w-full cursor-pointer font-gilroy-medium text-base font-medium leading-5 text-[#292929]'
        onClick={toggleDropdown}
      >
        {label}
      </label>
      <div className='relative w-full' ref={dropdownRef}>
        <div
          className='flex w-full cursor-pointer items-center justify-between rounded-md border border-[#CACCD2] px-4 py-2'
          onClick={toggleDropdown}
        >
          <span className='font-gilroy-regular text-sm font-normal leading-5 text-[#6C6D75]'>{placeholder}</span>
          <svg
            className={`h-4 w-4 transform text-[#6C6D75] ${isOpen ? "rotate-180" : ""}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </div>
        {isOpen && (
          <div className='absolute z-10 inline-block max-h-48 w-full overflow-y-auto rounded-md border border-[#CACCD2] bg-white shadow-lg'>
            {allEmployees.map((employee) => (
              <label
                htmlFor={employee.id}
                className='flex cursor-pointer px-4 py-2 hover:bg-gray-100'
                key={employee.id}
              >
                <input
                  type='checkbox'
                  id={employee.id}
                  checked={selectedDrop.includes(employee.id)}
                  onChange={() => handleOptionSelect(employee.id)}
                  className='ml-1 mr-3 inline-block w-4 accent-[#142E2B]'
                />
                <span className='inline-block font-gilroy-regular text-sm text-[#6C6D75]'>
                  {employee.firstName} {employee.lastName}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      {selectedEmployees.length > 0 && (
        <div className='max-h-48 w-full overflow-y-auto'>
          {selectedEmployees.map((employeeId) => {
            const employee = allEmployees.find((emp) => emp.id === employeeId);
            if (employee) {
              return (
                <div key={employee.id} className='mt-2 w-full'>
                  <li className='mt-2 flex w-full items-center justify-between px-4 font-gilroy-regular text-sm font-normal leading-6 text-[#142E2B]'>
                    {employee.firstName} {employee.lastName}
                    <div className='flex items-center justify-center'>
                      <WorkTimeSelector label='' options={["Full Time", "Part Time"]} defaultValue='Full Time' />
                      <img
                        className='pl-3'
                        src={arrow}
                        alt='X'
                        onClick={() => handleRemoveEmployeeNew(employee.id)}
                      ></img>
                    </div>
                  </li>
                  <hr className='my-4 w-full border-[#DFE3E1]' />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeDropdownSelector;
