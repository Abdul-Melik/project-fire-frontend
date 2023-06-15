import { useEffect, useState } from 'react';

import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useGetEmployeesQuery } from 'store/slices/employeesApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout/MainLayout';
import Navbar from 'src/components/navigation/NavBar';
import EmployeesTable from 'features/employees/EmployeesTable';
import ViewEmployee from 'features/employees/ViewEmployee';
import AddNewEmployee from 'features/employees/AddNewEmployee';

const navLabels = ['All Employees', 'Current', 'Past'];

const Employees = () => {
	const [activePage, setActivePage] = useState(1);
	const [isViewEmployeeOpen, setIsViewEmployeeOpen] = useState(false);
	const [isAddNewEmployeeOpen, setIsAddNewEmployeeOpen] = useState(false);
	const [employeeId, setEmployeeId] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isEmployed, setIsEmployed] = useState('');
	const [orderByField, setOrderByField] = useState('firstName');
	const [orderDirection, setOrderDirection] = useState('desc');

	const user = useAppSelector(selectCurrentUser);
	const { isLoading, isFetching, isSuccess, data } = useGetEmployeesQuery(
		{
			searchTerm,
			isEmployed,
			orderByField,
			orderDirection,
		},
		{
			pollingInterval: 60000,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		}
	);

	useEffect(() => {
		if (activePage === 1) setIsEmployed('');
		else if (activePage === 2) setIsEmployed('true');
		else if (activePage === 3) setIsEmployed('false');
	}, [activePage, setIsEmployed]);

	return (
		<MainLayout activeMenuItem={'employees'}>
			{isViewEmployeeOpen && <ViewEmployee employeeId={employeeId} onClick={() => setIsViewEmployeeOpen(false)} />}
			{isAddNewEmployeeOpen && <AddNewEmployee onClick={() => setIsAddNewEmployeeOpen(false)} />}
			<div className='mx-14 mb-[17px] mt-[34px]'>
				<div className='mb-[30px] flex items-center justify-between'>
					<h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Employees</h1>
					{user?.role === 'Admin' && (
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
							onClick={() => setIsAddNewEmployeeOpen(true)}
						>
							Add New Employee
						</button>
					)}
				</div>
				<div className='flex flex-col'>
					<div className='mb-[30px]'>
						<Navbar
							navLabels={navLabels}
							handlePageSelect={pageNumber => {
								setActivePage(pageNumber);
								setSearchTerm('');
								setOrderByField('firstName');
								setOrderDirection('desc');
							}}
						/>
					</div>
					{isLoading || isFetching ? (
						<LoadingSpinner />
					) : (
						isSuccess && (
							<EmployeesTable
								employees={data}
								value={searchTerm}
								orderByField={orderByField}
								orderDirection={orderDirection}
								handleSearch={input => setSearchTerm(input)}
								handleSort={(label: string, orderDirection: string) => {
									setOrderByField(label);
									setOrderDirection(orderDirection);
								}}
								onClick={(employeeId: string) => {
									setIsViewEmployeeOpen(true);
									setEmployeeId(employeeId);
								}}
							/>
						)
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Employees;
