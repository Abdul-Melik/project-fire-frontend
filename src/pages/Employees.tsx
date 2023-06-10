import { useGetEmployeesQuery } from 'src/redux/employeesApiSlice';
import LoadingSpinner from 'src/components/shared/utils/LoadingSpinner';
import MainLayout from 'src/components/shared/layout/MainLayout';

const Employees = () => {
	const { data, isLoading, error } = useGetEmployeesQuery({});

	if (isLoading) return <LoadingSpinner />;

	return <MainLayout activeMenuItem={'employees'}>{JSON.stringify(data)}</MainLayout>;
};

export default Employees;
