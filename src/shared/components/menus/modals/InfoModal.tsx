import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faTimes } from "@fortawesome/free-solid-svg-icons";

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
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  const handleExpand = (employeeId: string) => {
    setExpandedEmployee(employeeId === expandedEmployee ? null : employeeId);
  };

  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-30'>
      <div className='absolute w-4/5 max-w-full rounded border-black bg-gray-100 p-9 shadow-lg md:w-3/4 lg:w-2/3 xl:w-1/2'>
        <button className='absolute right-0 top-0 p-4 pr-6 hover:text-red-900'>
          <FontAwesomeIcon className='text-xl' icon={faTimes} onClick={onClose} />
        </button>
        <header className='mb-4 font-gilroy-regular text-3xl'>
          <span className='font-bold'>Project:</span> {project.name}
        </header>

        <div className='flex flex-col justify-between font-gilroy-regular md:flex-row'>
          <div className='md:w-1/2'>
            <p className='text-base'>
              <span className='font-inter-regular font-bold'>Project Type:</span> {project.projectType}
            </p>
            <p className='text-base'>
              <span className='font-inter-regular font-bold'>Hourly Rate:</span> ${project.hourlyRate} KM
            </p>
            <p className='text-base'>
              <span className='font-inter-regular font-bold'>Project Value:</span> $
              {project.projectValueBAM.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              KM
            </p>
            <p className='text-base'>
              <span className='font-inter-regular font-bold'>Sales Channel:</span> {project.salesChannel}
            </p>
          </div>
          <div className='relative md:flex md:w-1/2 md:items-start'>
            <div className='md:ml-auto'>
              <p className='text-base'>
                <span className='font-inter-regular font-bold'>Start Date:</span>{" "}
                {new Date(project.startDate).toLocaleDateString()}
              </p>
              <p className='text-base'>
                <span className='font-inter-regular font-bold'>End Date:</span>{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </p>
              <p className='text-base'>
                <span className='font-inter-regular font-bold'>Actual End Date:</span>{" "}
                {new Date(project.actualEndDate).toLocaleDateString()}
              </p>
              <p className='text-base'>
                <span className='font-inter-regular font-bold'>Project Status:</span> {project.projectStatus}
              </p>
            </div>
          </div>
        </div>

        <p className='mt-5 font-gilroy-regular text-base'>
          <span className=' font-inter-regular font-bold'>Description:</span> {project.description}
        </p>
        <h3 className='mt-4 flex justify-center font-inter-regular text-xl font-bold'>Employees on Project:</h3>
        <ul className='flex flex-wrap justify-center'>
          {project.employees.map((employeeObj) => (
            <li key={employeeObj.employee.id} className='relative my-2 px-2 py-2 text-sm'>
              <div className='flex flex-col items-center rounded-xl border bg-white px-4 py-4'>
                <div className='mb-2 flex-shrink-0'>
                  <img
                    className='h-[70px] w-[70px] rounded-full object-cover'
                    src={employeeObj.employee.image}
                    alt={`${employeeObj.employee.firstName} ${employeeObj.employee.lastName}`}
                  />
                </div>
                <div className='px-3'>
                  <div className='flex items-center font-inter-regular'>
                    <p className=' text-base font-bold'>{employeeObj.employee.firstName}</p>
                    <p className='ml-2  text-base font-bold'>{employeeObj.employee.lastName}</p>
                  </div>
                  <p className='text-center'>
                    <span className='items-center font-gilroy-regular font-bold'>Department:</span>{" "}
                    {employeeObj.employee.department}
                  </p>

                  {expandedEmployee === employeeObj.employee.id && (
                    <div className='details absolute left-1/2 top-52 z-20 flex w-72 -translate-x-1/2 -translate-y-2 transform flex-col items-center justify-center rounded border-gray-900 bg-seafoam-green px-4 py-2 shadow-lg'>
                      <p className='text-base'>
                        <span className='flex-nowrap font-bold'>Salary:</span> {employeeObj.employee.salary} KM
                      </p>
                      <p className='text-base'>
                        <span className='flex-nowrap font-bold'>Part-Time:</span> {employeeObj.partTime ? "Yes" : "No"}
                      </p>
                      <p className='text-base'>
                        <span className='flex-nowrap font-bold'>Tech Stack:</span>{" "}
                        {employeeObj.employee.techStack.join(", ")}
                      </p>
                    </div>
                  )}

                  <button
                    className='mt-2 flex w-full items-center justify-center rounded bg-pale-jade px-4 py-2 font-gilroy-semi-bold text-deep-teal'
                    onMouseEnter={() => handleExpand(employeeObj.employee.id)}
                    onMouseLeave={() => handleExpand(employeeObj.employee.id)}
                  >
                    <FontAwesomeIcon icon={faBookOpenReader} className='mr-2' />
                    View
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button className='mt-6 rounded bg-slate-mist px-12 py-2 text-white hover:bg-opacity-80' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
