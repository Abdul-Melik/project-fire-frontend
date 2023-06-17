import { useState, useEffect } from 'react';

import { invoicesData } from 'src/data/index';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import MainLayout from 'components/layout/MainLayout';
import Navbar from 'components/navigation/NavBar';
import InvoicesTable from 'features/invoicing/InvoicesTable';

type Invoice = {
	id: string;
	client: string;
	industry: string;
	totalHoursBilled: number;
	amountBilledBAM: number;
	status: string;
};

const handleData = (
	invoicesData: Invoice[],
	invoiceStatus: string,
	searchTerm: string,
	orderByField: string,
	orderDirection: string
) => {
	return invoicesData
		.filter(invoice => (invoiceStatus ? invoice.status === invoiceStatus : true))
		.filter(invoice => (searchTerm ? invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) : true))
		.sort((a, b) => {
			const sortValueA =
				orderByField === 'client' || orderByField === 'industry'
					? a[orderByField].localeCompare(b[orderByField])
					: orderByField === 'totalHoursBilled'
					? a.totalHoursBilled - b.totalHoursBilled
					: orderByField === 'amountBilledBAM'
					? a.amountBilledBAM - b.amountBilledBAM
					: ['Paid', 'Sent', 'NotSent'].indexOf(a.status) - ['Paid', 'Sent', 'NotSent'].indexOf(b.status);

			return orderDirection === 'asc' ? sortValueA : -sortValueA;
		});
};

const navLabels = ['All Invoices', 'Sent', 'Paid'];

const Invoicing = () => {
	const [activePage, setActivePage] = useState(1);
	const [invoiceStatus, setInvoiceStatus] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [orderByField, setOrderByField] = useState('client');
	const [orderDirection, setOrderDirection] = useState('asc');

	const user = useAppSelector(selectCurrentUser);

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
								setSearchTerm('');
								setOrderByField('client');
								setOrderDirection('asc');
							}}
						/>
					</div>
					<InvoicesTable
						invoices={handleData(invoicesData, invoiceStatus, searchTerm, orderByField, orderDirection)}
						value={searchTerm}
						orderByField={orderByField}
						orderDirection={orderDirection}
						handleSearch={input => setSearchTerm(input)}
						handleSort={(label: string, orderDirection: string) => {
							setOrderByField(label);
							setOrderDirection(orderDirection);
						}}
					/>
				</div>
			</div>
		</MainLayout>
	);
};

export default Invoicing;
