import apiSlice from 'src/redux/apiSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EMPLOYEES_URL = `${BASE_URL}/api/employees`;

export const employeesApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getEmployees: builder.query({
			query: () => ({
				url: EMPLOYEES_URL,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useGetEmployeesQuery } = employeesApi;
