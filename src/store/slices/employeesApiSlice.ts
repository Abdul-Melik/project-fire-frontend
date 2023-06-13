import apiSlice from 'store/slices/apiSlice';

export const employeesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getEmployees: builder.query({
			query: ({ searchTerm }) => ({
				url: `/employees?searchTerm=${searchTerm}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetEmployeesQuery } = employeesApiSlice;
