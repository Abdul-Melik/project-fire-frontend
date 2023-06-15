import apiSlice from 'store/slices/apiSlice';

export const employeesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getEmployees: builder.query({
			query: ({ searchTerm, isEmployed, orderByField, orderDirection }) => ({
				url: `/employees?searchTerm=${searchTerm}&isEmployed=${isEmployed}&orderByField=${orderByField}&orderDirection=${orderDirection}`,
				method: 'GET',
			}),
		}),
		getEmployeeById: builder.query({
			query: employeeId => ({ url: `/employees/${employeeId}`, method: 'GET' }),
		}),
		createEmployee: builder.mutation({
			query: data => ({ url: `/employees`, method: 'POST', body: data, formData: true }),
		}),
	}),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery, useCreateEmployeeMutation } = employeesApiSlice;
