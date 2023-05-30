import { useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import EmployeeTableHead from 'src/shared/components/table-elements/EmployeeTableHead';
import TableHeader from 'src/shared/components/table-elements/TableHeader';
import TableRow from 'src/shared/components/table-elements/TableRow';
import Checkbox from 'src/shared/components/form-elements/Checkbox';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';

interface Employee {
	id: string;
	firstName: string;
	lastName: string;
	department: string;
	salary: number;
	techStack: string[];
}

interface EmployeeOnProject {
	employee: {
		id: string;
		firstName: string;
		lastName: string;
		department: string;
		salary: number;
		techStack: string[];
	};
	fullTime: boolean;
}

type Props = {
	confirmData: boolean;
	selectedRows: string[];
	selectedCheckboxes: string[];
	handleConfirmation: (employees: EmployeeOnProject[]) => void;
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
	const { token } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getEmployees = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/employees?firstName=${searchTerm}`, {
				headers: { Authorization: 'Bearer ' + token },
			});
			setEmployees(response.data);
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
		setIsLoading(false);
	}, [token, searchTerm]);

	useEffect(() => {
		if (token) getEmployees();
	}, [token, searchTerm]);

	useEffect(() => {
		if (confirmData && employees.length > 0) {
			const employeesOnProject: EmployeeOnProject[] = selectedRows.reduce((acc: EmployeeOnProject[], id) => {
				const checkbox = selectedCheckboxes.find(checkboxId => checkboxId === id);
				const employee = employees.find(employee => employee.id === id);
				if (employee) {
					acc.push({ employee, fullTime: checkbox ? false : true });
				}
				return acc;
			}, []);
			handleConfirmation(employeesOnProject);
		}
	}, [employees, confirmData]);

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
						handleSearch={input => setSearchTerm(input)}
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
										<td className='w-[150px] pl-4'>{employee.techStack}</td>
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
