import { useState, useEffect } from 'react';

import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import { useGetInvoicesQuery } from 'store/slices/invoicingApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout';
import Navbar from 'components/navigation/NavBar';
import Pagination from 'components/pagination';
import InvoicesTable from 'features/invoicing/InvoicesTable';

const navLabels = ['All Invoices', 'Sent', 'Paid'];

const Invoicing = () => {
	const [activePage, setActivePage] = useState(1);
	const [client, setClient] = useState('');
	const [invoiceStatus, setInvoiceStatus] = useState('');
	const [orderByField, setOrderByField] = useState('client');
	const [orderDirection, setOrderDirection] = useState('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const [invoicesPerPage, setInvoicesPerPage] = useState(10);

	const user = useAppSelector(selectCurrentUser);
	const { isLoading, isFetching, isSuccess, data } = useGetInvoicesQuery(
		{
			client,
			invoiceStatus,
			orderByField,
			orderDirection,
			invoicesPerPage,
			currentPage,
		},
		{
			pollingInterval: 60000,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		}
	);

	useEffect(() => {
		if (activePage === 1) setInvoiceStatus('');
		else if (activePage === 2) setInvoiceStatus('Sent');
		else if (activePage === 3) setInvoiceStatus('Paid');
	}, [activePage]);

	return (
		<MainLayout activeMenuItem={'invoicing'}>
			<div className='mx-14 mb-[17px] mt-[34px]'>
				<div className='mb-[30px] flex items-center justify-between'>
					<h1 className='font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Invoicing</h1>
					{user?.role === 'Admin' && (
						<button
							className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white hover:saturate-[400%]'
							onClick={() => {}}
						>
							Create New Invoice
						</button>
					)}
				</div>
				<div className='flex flex-col'>
					<div className='mb-[30px]'>
						<Navbar
							navLabels={navLabels}
							handlePageSelect={pageNumber => {
								setActivePage(pageNumber);
								setInvoicesPerPage(10);
								setCurrentPage(1);
								setClient('');
								setOrderByField('client');
								setOrderDirection('asc');
							}}
						/>
					</div>
					{isLoading || isFetching ? (
						<LoadingSpinner />
					) : (
						isSuccess && (
							<InvoicesTable
								totalNumberOfInvoices={data.pageInfo.total}
								invoices={data.invoices}
								value={client}
								orderByField={orderByField}
								orderDirection={orderDirection}
								handleSearch={input => setClient(input)}
								handleSort={(label: string, orderDirection: string) => {
									setOrderByField(label);
									setOrderDirection(orderDirection);
								}}
							/>
						)
					)}
				</div>
			</div>
			<div className='mx-14 mb-[25px]'>
				{isSuccess && (
					<Pagination
						total={data.pageInfo.total}
						currentPage={data.pageInfo.currentPage}
						lastPage={data.pageInfo.lastPage}
						perPage={invoicesPerPage}
						items='Invoices'
						handlePerPage={invoicesPerPage => {
							setInvoicesPerPage(invoicesPerPage);
							setCurrentPage(1);
							setClient('');
						}}
						handlePageChange={pageNumber => setCurrentPage(pageNumber)}
					/>
				)}
			</div>
		</MainLayout>
	);
};

export default Invoicing;
