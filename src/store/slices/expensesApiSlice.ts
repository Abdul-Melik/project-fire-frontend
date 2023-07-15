import apiSlice from "store/slices/apiSlice";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: ({ searchTerm }) => ({
        url: `/expenses?name=${searchTerm}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.expenses.map(({ id }: { id: string }) => ({
                type: "Expense" as const,
                id,
              })),
              "Expense",
            ]
          : ["Expenses"],
    }),
    getExpensesInfo: builder.query({
      query: ({ year }) => ({
        url: `/expenses/info?year=${year}`,
        method: "GET",
      }),
    }),
    createExpense: builder.mutation({
      query: (data) => ({ url: "/expenses", method: "POST", body: data }),
    }),
    updateExpense: builder.mutation({
      query: ({ expenseId, data }) => ({
        url: `/expenses/${expenseId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteExpense: builder.mutation({
      query: ({ expenseId }) => ({
        url: `/expenses/${expenseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpensesInfoQuery,
  useUpdateExpenseMutation,
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;
