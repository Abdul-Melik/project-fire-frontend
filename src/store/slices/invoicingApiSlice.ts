import apiSlice from 'store/slices/apiSlice';

export const invoicingApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getInvoices: builder.query({
			query: ({ client, invoiceStatus, orderByField, orderDirection, invoicesPerPage, currentPage }) => ({
				url: `/invoices?client=${client}&invoiceStatus=${invoiceStatus}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${invoicesPerPage}&page=${currentPage}`,
				method: 'GET',
			}),
			providesTags: (result, error, arg) =>
				result
					? [...result.invoices.map(({ id }: { id: string }) => ({ type: 'Invoice' as const, id })), 'Invoice']
					: ['Invoice'],
		}),
	}),
});

export const { useGetInvoicesQuery } = invoicingApiSlice;
