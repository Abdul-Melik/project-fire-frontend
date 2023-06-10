import { useGetEmployeesQuery } from 'store/slices/employeesApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout/MainLayout';

const Employees = () => {
	const { data, isLoading, error } = useGetEmployeesQuery({});

	if (isLoading) return <LoadingSpinner />;

	return <MainLayout activeMenuItem={'employees'}>{JSON.stringify(data)}</MainLayout>;
};

export default Employees;
