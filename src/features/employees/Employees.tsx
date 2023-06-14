import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetEmployeesQuery } from 'src/store/slices/employeesApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout/MainLayout';
import Navbar from 'components/navbar/Navbar';
import EmployeesTable from 'features/employees/EmployeesTable';

const navLabels = ['All Employees', 'Current', 'Past'];

const Employees = () => {
	const navigate = useNavigate();
	const [activePage, setActivePage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [isEmployed, setIsEmployed] = useState('');
	const [orderByField, setOrderByField] = useState('firstName');
	const [orderDirection, setOrderDirection] = useState('desc');

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
			<div className='mx-14 mb-[17px] mt-[34px]'>
				<div className='mb-[30px] flex items-center justify-between'>
					<h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Employees</h1>
					<button
						className={`rounded-md px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white ${
							true ? 'bg-deep-teal hover:saturate-[400%]' : 'cursor-not-allowed bg-whispering-gray'
						}`}
						disabled={false}
						onClick={() => navigate('/employees')}
					>
						Add New Employee
					</button>
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
							/>
						)
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Employees;
