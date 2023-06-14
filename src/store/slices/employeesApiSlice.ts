import apiSlice from 'store/slices/apiSlice';

export const employeesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getEmployees: builder.query({
			query: ({ searchTerm, isEmployed, orderByField, orderDirection }) => ({
				url: `/employees?searchTerm=${searchTerm}&isEmployed=${isEmployed}&orderByField=${orderByField}&orderDirection=${orderDirection}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetEmployeesQuery } = employeesApiSlice;
