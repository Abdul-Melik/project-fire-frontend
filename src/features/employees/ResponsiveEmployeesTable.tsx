import { useContext, useState } from 'react';
import axios from 'axios';

import TableHeader from 'src/components/tableElements/TableHeader';
import TableHead from 'src/components/tableElements/TableHead';
import TableRow from 'src/components/tableElements/TableRow';
import DataCard from 'src/components/cards/DataCard';
import PlanCardItem from 'src/features/home/PlanCardItem';
import arrow from 'src/assets/media/svg/arrow.svg';
import React from 'react';
import { Employee } from 'src/types';

type Props = {
	totalNumberOfEmployees: number;
	employees: Employee[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
};

const ResponsiveEmployeesTable = ({
	totalNumberOfEmployees,
	employees,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
}: Props) => {
	const [selectedEmployee, setSelectedEmployee] = useState<string>('');

	const columns = [
		{ name: 'First Name', label: 'firstName' },
		{ name: 'Last Name', label: 'lastName' },
	];

	const selectEmployee = (employeeId: string) => {
		selectedEmployee === employeeId ? setSelectedEmployee('') : setSelectedEmployee(employeeId);
	};

	return (
		<div className='w-full rounded-md border border-ashen-grey bg-white'>
			<TableHeader label='All Employees' total={totalNumberOfEmployees} value={value} handleSearch={handleSearch} />
			<div className='table-responsive'>
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
								<React.Fragment key={employeeId}>
									<TableRow className='hover:cursor-pointer hover:bg-white' onClick={() => selectEmployee(employeeId)}>
										<td className='pl-4'>
											<div className='flex w-3/5 items-center justify-between font-gilroy-regular text-[16px] leading-6 text-deep-forest'>
												<p>{employee.firstName}</p>
											</div>
										</td>
										<td className='flex h-[60px] items-center gap-2 pl-4'>
											<div className='flex w-3/5 items-center justify-between font-gilroy-regular text-[16px] leading-6 text-deep-forest'>
												<p>{employee.lastName}</p>
											</div>{' '}
										</td>
									</TableRow>
									{employeeId === selectedEmployee && (
										<tr className='ml-[10%]'>
											<td colSpan={2}>
												<div className='ml-[5%] mt-[11px] flex w-[90%] flex-col gap-[5px] !text-[15px]'>
													<PlanCardItem text='Department' amount={employee.department} />
													<PlanCardItem text='Monthly Salary (BAM)' amount={employee.salary.toString()} />
													<PlanCardItem text='Tech Stack' amount={employee.techStack.toString()} />
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ResponsiveEmployeesTable;
