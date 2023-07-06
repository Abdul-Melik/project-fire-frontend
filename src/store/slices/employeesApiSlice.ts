import apiSlice from "store/slices/apiSlice";

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({
        searchTerm,
        isEmployed,
        orderByField,
        orderDirection,
        employeesPerPage,
        currentPage,
      }) => ({
        url: `/employees?searchTerm=${searchTerm}&isEmployed=${isEmployed}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${employeesPerPage}&page=${currentPage}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.employees.map(({ id }: { id: string }) => ({
                type: "Employee" as const,
                id,
              })),
              "Employee",
            ]
          : ["Employee"],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employees",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: ({ employeeId, data }) => ({
        url: `/employees/${employeeId}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: ({ employeeId }) => ({
        url: `/employees/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApiSlice;
