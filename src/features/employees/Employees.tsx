import { useState } from 'react';
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

	const { isLoading, isFetching, isSuccess, data } = useGetEmployeesQuery(
		{
			searchTerm,
		},
		{
			pollingInterval: 60000,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		}
	);

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
							}}
						/>
					</div>
					{isLoading || isFetching ? (
						<LoadingSpinner />
					) : (
						isSuccess && (
							<EmployeesTable employees={data} value={searchTerm} handleSearch={input => setSearchTerm(input)} />
						)
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Employees;
