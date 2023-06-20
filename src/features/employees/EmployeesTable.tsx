import { Employee } from 'src/types';
import { getEmployeeTechStack } from 'src/helpers';
import { editIcon, deleteIcon } from 'assets/media';
import TableHeader from 'components/tableElements/TableHeader';
import TableHead from 'src/components/tableElements/TableHead';
import TableRow from 'components/tableElements/TableRow';

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
	return (
		<div className='w-full rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='All Employees' total={totalNumberOfEmployees} value={value} handleSearch={handleSearch} />
			<table className='w-full border-t border-ashen-grey'>
				<TableHead
					columns={columns}
					orderByField={orderByField}
					orderDirection={orderDirection}
					handleSort={handleSort}
				/>
				<tbody>
					{employees.map(employee => {
						const employeeId = employee.id;
						return (
							<TableRow key={employeeId} className='cursor-pointer' onClick={() => openViewEmployee(employeeId)}>
								<td className='p-4'>{employee.firstName}</td>
								<td className='p-4'>{employee.lastName}</td>
								<td className='p-4'>{employee.department}</td>
								<td className='p-4'>{employee.salary.toFixed(2)}</td>
								<td className='p-4'>{getEmployeeTechStack(employee.techStack)}</td>
								<td className='p-4'>
									<div className='flex items-center '>
										<div
											className='flex items-center gap-2 px-2 hover:cursor-pointer'
											onClick={event => {
												event.stopPropagation();
												openEditEmployee(employeeId);
											}}
										>
											<img className='h-[14px] w-[14px]' src={editIcon} alt='Edit Iicon' />
											<span>Edit</span>
										</div>
										<div className='h-3 border border-ashen-grey' />
										<div
											className='flex items-center gap-2 px-2 hover:cursor-pointer'
											onClick={event => {
												event.stopPropagation();
												handleDelete(employeeId);
											}}
										>
											<img className='h-[14px] w-[14px]' src={deleteIcon} alt='Delete icon' />
											<span>Delete</span>
										</div>
									</div>
								</td>
							</TableRow>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EmployeesTable;
