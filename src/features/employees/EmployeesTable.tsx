import { editIcon, deleteIcon } from 'assets/media';
import EmployeesTableHead from 'src/features/employees/EmployeesTableHead';
import TableHeader from 'components/table-elements/TableHeader';
import TableRow from 'components/table-elements/TableRow';

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
	department: string;
	salary: number;
	techStack: string[];
};

type Props = {
	employees: Employee[];
	value: string;
	handleSearch: (input: string) => void;
};

const columns = ['First Name', 'Last Name', 'Department', 'Monthly Salary (BAM)', 'Tech Stack', 'Actions'];

const EmployeesTable = ({ employees, value, handleSearch }: Props) => {
	return (
		<div className='h-[400px] w-full overflow-y-scroll rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='All Employees' total={employees.length} value={value} handleSearch={handleSearch} />
			<table className='w-full border-t border-ashen-grey'>
				<EmployeesTableHead columns={columns} />
				<tbody>
					{employees.map(employee => {
						const employeeId = employee.id;
						return (
							<TableRow key={employeeId}>
								<td className='w-[175px] p-4'>{employee.firstName}</td>
								<td className='w-[175px] p-4'>{employee.lastName}</td>
								<td className='w-[175px] p-4'>{employee.department}</td>
								<td className='w-[175px] p-4'>{employee.salary.toFixed(2)}</td>
								<td className='w-[175px] p-4'>{employee.techStack}</td>
								<td className='flex w-[175px] items-center p-4'>
									<div className='flex items-center gap-2 px-2 hover:cursor-pointer'>
										<img className='h-[14px] w-[14px]' src={editIcon} alt='Edit Icon' />
										<span>Edit</span>
									</div>
									<div className='h-3 border border-ashen-grey' />
									<div className='flex items-center gap-2 px-2 hover:cursor-pointer'>
										<img className='h-[14px] w-[14px]' src={deleteIcon} alt='Delete Icon' />
										<span>Delete</span>
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
