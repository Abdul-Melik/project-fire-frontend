import { useCallback } from 'react';

import { Employee } from 'src/types';
import { getEmployeeTechStack } from 'src/helpers';
import Table from 'components/tableElements/Table';
import TableRow from 'components/tableElements/TableRow';
import EmployeeActions from 'features/employees/EmployeeActions';

type Props = {
	totalNumberOfEmployees: number;
	employees: Employee[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
	handleDelete: (employeeId: string) => void;
	openViewEmployee: (employeeId: string) => void;
	openEditEmployee: (employeeId: string) => void;
};

const columns = [
	{ name: 'First Name', label: 'firstName' },
	{ name: 'Last Name', label: 'lastName' },
	{ name: 'Department', label: 'department' },
	{ name: 'Monthly Salary (BAM)', label: 'salary' },
	{ name: 'Tech Stack', label: 'techStack' },
	{ name: 'Actions', label: 'actions' },
];

const EmployeesTable = ({
	totalNumberOfEmployees,
	employees,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
	handleDelete,
	openViewEmployee,
	openEditEmployee,
}: Props) => {
	const getEmployeesTableRow = useCallback(
		(employee: Employee) => {
			const employeeId = employee.id;
			return (
				<TableRow key={employeeId} className='cursor-pointer' onClick={() => openViewEmployee(employeeId)}>
					<td className='p-4'>{employee.firstName}</td>
					<td className='p-4'>{employee.lastName}</td>
					<td className='p-4'>{employee.department}</td>
					<td className='p-4'>{employee.salary.toFixed(2)}</td>
					<td className='p-4'>{getEmployeeTechStack(employee.techStack)}</td>
					<td className='p-4'>
						<EmployeeActions employeeId={employeeId} openEditEmployee={openEditEmployee} handleDelete={handleDelete} />
					</td>
				</TableRow>
			);
		},
		[openViewEmployee, getEmployeeTechStack, openEditEmployee, handleDelete]
	);

	return (
		<Table
			label='All Employees'
			total={totalNumberOfEmployees}
			value={value}
			columns={columns}
			orderByField={orderByField}
			orderDirection={orderDirection}
			handleSearch={handleSearch}
			handleSort={handleSort}
			rows={employees.map(employee => getEmployeesTableRow(employee))}
		/>
	);
};

export default EmployeesTable;
