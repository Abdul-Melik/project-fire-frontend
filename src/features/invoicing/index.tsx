import { useState, useEffect } from 'react';

import { Invoice } from 'src/types';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import {
	useGetInvoicesQuery,
	useUpdateInvoiceMutation,
	useDeleteInvoiceMutation,
} from 'store/slices/invoicingApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import AlertModal from 'components/modals/AlertModal';
import Pagination from 'components/pagination';
import Navbar from 'components/navigation/NavBar';
import MainLayout from 'components/layout';
import InvoicesTable from 'features/invoicing/InvoicesTable';

const navLabels = ['All Invoices', 'Sent', 'Paid'];

const Invoicing = () => {
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [activePage, setActivePage] = useState(1);
	const [invoiceId, setInvoiceId] = useState('');
	const [client, setClient] = useState('');
	const [invoiceStatus, setInvoiceStatus] = useState('');
	const [orderByField, setOrderByField] = useState('client');
	const [orderDirection, setOrderDirection] = useState('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const [invoicesPerPage, setInvoicesPerPage] = useState(10);

	const user = useAppSelector(selectCurrentUser);
	const {
		isLoading,
		isFetching,
		isSuccess: isInvoicesSuccess,
		data,
	} = useGetInvoicesQuery(
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
	const [updateInvoice, { isSuccess: isUpdateSuccess }] = useUpdateInvoiceMutation();
	const [deleteInvoice, { isSuccess: isDeleteSuccess }] = useDeleteInvoiceMutation();

	useEffect(() => {
		if (activePage === 1) setInvoiceStatus('');
		else if (activePage === 2) setInvoiceStatus('Sent');
		else if (activePage === 3) setInvoiceStatus('Paid');
	}, [activePage]);

	const updateInvoiceStatus = async (invoiceId: string, invoiceStatus: string) => {
		await updateInvoice({ invoiceId, data: { invoiceStatus } });
	};

	const onConfirm = async () => {
		await deleteInvoice({ invoiceId });
	};

	useEffect(() => {
		if (isDeleteSuccess) setIsAlertModalOpen(false);
	}, [isDeleteSuccess]);

	const invoice = isInvoicesSuccess && data.invoices.find((invoice: Invoice) => invoice.id === invoiceId);

	return (
		<MainLayout activeMenuItem={'invoicing'}>
			{isAlertModalOpen && (
				<AlertModal
					alertTitle={`Are you sure you want to delete ${invoice.client}?`}
					alertDescription={`This will permanently delete ${invoice.client} and all associated data. You cannot undo this action.`}
					cancelButtonText="Don't Delete"
					confirmButtonText='Delete'
					confirmButtoncolor='#FF4D4F'
					onCancel={() => setIsAlertModalOpen(false)}
					onConfirm={onConfirm}
				/>
			)}
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
						(isInvoicesSuccess || isUpdateSuccess) && (
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
								handleUpdate={(invoiceId, invoiceStatus) => {
									updateInvoiceStatus(invoiceId, invoiceStatus);
								}}
								handleDelete={invoiceId => {
									setIsAlertModalOpen(true);
									setInvoiceId(invoiceId);
								}}
							/>
						)
					)}
				</div>
			</div>
			<div className='mx-14 mb-[25px]'>
				{isInvoicesSuccess && (
					<Pagination
						total={data.pageInfo.total}
						currentPage={data.pageInfo.currentPage}
						lastPage={data.pageInfo.lastPage}
						perPage={invoicesPerPage}
						items='Invoices'
						handlePerPageSelection={invoicesPerPage => {
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
