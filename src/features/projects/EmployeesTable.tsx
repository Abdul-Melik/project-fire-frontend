import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import LoadingSpinner from 'components/utils/LoadingSpinner';
import EmployeeTableHead from 'components/table-elements/EmployeeTableHead';
import TableHeader from 'components/table-elements/TableHeader';
import TableRow from 'components/table-elements/TableRow';
import Checkbox from 'components/form-elements/Checkbox';

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
	confirmData: boolean;
	selectedRows: string[];
	selectedCheckboxes: string[];
	handleConfirmation: (employees: EmployeesPerProject[]) => void;
	handleRowsSelection: (rows: string[]) => void;
	handleCheckboxesSelection: (checkboxes: string[]) => void;
};

const columns = ['First Name', 'Last Name', 'Department', 'Salary', 'Tech Stack', 'Part Time'];

const EmployeesTable = ({
	confirmData,
	selectedRows,
	selectedCheckboxes,
	handleConfirmation,
	handleRowsSelection,
	handleCheckboxesSelection,
}: Props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getEmployees = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/employees?firstName=${searchTerm}`, {
				headers: { Authorization: 'Bearer ' },
			});
			setEmployees(response.data);
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
		setIsLoading(false);
	}, [searchTerm]);

	const getAllEmployees = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/employees`, {
				headers: { Authorization: 'Bearer ' },
			});
			setAllEmployees(response.data);
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (false) getAllEmployees();
	}, []);

	useEffect(() => {
		if (false) getEmployees();
	}, [searchTerm]);

	useEffect(() => {
		if (confirmData && employees.length > 0) {
			const employeesOnProject: EmployeesPerProject[] = selectedRows.reduce((result: EmployeesPerProject[], id) => {
				const checkbox = selectedCheckboxes.find(checkboxId => checkboxId === id);
				const employee = allEmployees.find(employee => employee.id === id);
				if (employee) {
					result.push({ employee, partTime: checkbox ? true : false });
				}
				return result;
			}, []);
			handleConfirmation(employeesOnProject);
		}
	}, [employees, confirmData]);

	const formatTechStack = (techStack: string[]) => {
		const result = techStack.join(', ');
		return result.substring(0, 20) + (result.length > 20 ? '...' : '');
	};
	return (
		<div className='h-[400px] w-full overflow-y-scroll rounded-md border border-ashen-grey bg-white'>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<TableHeader
						label='Employees'
						total={employees.length}
						value={searchTerm}
						handleSearch={input => {
							setSearchTerm(input);
						}}
					/>
					<table className='w-full border-t border-ashen-grey'>
						<EmployeeTableHead columns={columns} />
						<tbody>
							{employees.map(employee => {
								const employeeId = employee.id;
								return (
									<TableRow
										key={employeeId}
										className={`hover:bg-ashen-grey ${selectedRows.includes(employeeId) ? 'bg-ashen-grey' : ''}`}
										onClick={event => {
											const target = event.target as HTMLElement;
											if (target.tagName !== 'INPUT') {
												handleRowsSelection(
													selectedRows.includes(employeeId)
														? selectedRows.filter(id => id !== employeeId)
														: selectedRows.concat(employeeId)
												);
											}
										}}
									>
										<td className='w-[150px] pl-4'>{employee.firstName}</td>
										<td className='w-[150px] pl-4'>{employee.lastName}</td>
										<td className='w-[150px] pl-4'>{employee.department}</td>
										<td className='w-[150px] pl-4'>{employee.salary}</td>
										<td className='w-[150px] pl-4'>{formatTechStack(employee.techStack)}</td>
										<td className='w-[150px] pl-4'>
											<Checkbox
												className='ml-4'
												label='Full Time'
												htmlFor='full-time'
												hidden
												id='full-time'
												checked={selectedCheckboxes.includes(employeeId)}
												handleChange={() => {
													handleCheckboxesSelection(
														selectedCheckboxes.find(checkboxId => checkboxId === employeeId)
															? selectedCheckboxes.filter(checkboxId => checkboxId !== employeeId)
															: selectedCheckboxes.concat(employeeId)
													);
												}}
											/>
										</td>
									</TableRow>
								);
							})}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
};

export default EmployeesTable;
