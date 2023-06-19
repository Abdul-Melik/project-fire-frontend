import { useState, useEffect } from 'react';

import { handleInvoicesData } from 'src/helpers';
import { invoicesData } from 'src/data';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/slices/authSlice';
import MainLayout from 'components/layout';
import Navbar from 'components/navigation/NavBar';
import InvoicesTable from 'features/invoicing/InvoicesTable';

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
						invoices={handleInvoicesData(invoicesData, invoiceStatus, searchTerm, orderByField, orderDirection)}
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
