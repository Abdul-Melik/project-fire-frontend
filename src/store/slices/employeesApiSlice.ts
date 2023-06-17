import apiSlice from 'store/slices/apiSlice';

export const employeesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getEmployees: builder.query({
			query: ({ searchTerm, isEmployed, orderByField, orderDirection }) => ({
				url: `/employees?searchTerm=${searchTerm}&isEmployed=${isEmployed}&orderByField=${orderByField}&orderDirection=${orderDirection}`,
				method: 'GET',
			}),
			providesTags: (result, error, arg) =>
				result
					? [...result.map(({ id }: { id: string }) => ({ type: 'Employee' as const, id })), 'Employee']
					: ['Employee'],
		}),
		getEmployeeById: builder.query({
			query: employeeId => ({ url: `/employees/${employeeId}`, method: 'GET' }),
		}),
		createEmployee: builder.mutation({
			query: data => ({ url: '/employees', method: 'POST', body: data, formData: true }),
			invalidatesTags: ['Employee'],
		}),
		updateEmployee: builder.mutation({
			query: ({ employeeId, data }) => ({
				url: `/employees/${employeeId}`,
				method: 'PATCH',
				body: data,
				formData: true,
			}),
			invalidatesTags: ['Employee'],
		}),
	}),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation } =
	employeesApiSlice;
