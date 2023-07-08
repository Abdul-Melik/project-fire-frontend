import { Employee } from "src/types";
import {
  getEmployeeSalaryInBAM,
  getEmployeeTechStack,
  getIsEmployedDate,
} from "src/helpers";

type Props = {
  employee: Employee;
};

const EmployeeSalaryAndTechStack = ({ employee }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-6">
      <div className="flex flex-col border-b border-ashen-grey pb-4">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Employment Status
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {employee.isEmployed ? "Current" : "Past"}
        </span>
      </div>
      <div className="flex flex-col border-b border-ashen-grey pb-4">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          {employee.isEmployed ? "Employed on" : "Fired on"}
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {getIsEmployedDate(employee.isEmployedDate)}
        </span>
      </div>
      <div className="flex flex-col border-b border-ashen-grey pb-4">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Monthly Salary (BAM)
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {getEmployeeSalaryInBAM(employee.salary, employee.currency)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-gilroy-medium text-base font-medium text-midnight-grey">
          Tech Stack
        </span>
        <span className="font-gilroy-regular text-base font-normal text-slate-mist">
          {getEmployeeTechStack(employee.techStack)}
        </span>
      </div>
    </div>
  );
};

export default EmployeeSalaryAndTechStack;
