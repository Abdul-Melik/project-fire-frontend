import { useCallback } from 'react';

import { Invoice } from 'src/types';
import { getInvoiceColorAndStatus } from 'src/helpers';
import { download, dollar, email, trash } from 'assets/media';
import Table from 'components/tableElements/Table';
import TableRow from 'components/tableElements/TableRow';

type Props = {
	totalNumberOfInvoices: number;
	invoices: Invoice[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
};

const columns = [
	{ name: 'Client', label: 'client' },
	{ name: 'Industry', label: 'industry' },
	{ name: 'Totall Hours Billed', label: 'totalHoursBilled' },
	{ name: 'Amount Billed (BAM)', label: 'amountBilledBAM' },
	{ name: 'Status', label: 'invoiceStatus' },
	{ name: 'Actions', label: 'actions' },
];

const InvoicesTable = ({
	totalNumberOfInvoices,
	invoices,
	value,
	orderByField,
	orderDirection,
	handleSearch,
	handleSort,
}: Props) => {
	const getInvoicesTableRow = useCallback((invoice: Invoice) => {
		const invoiceId = invoice.id;
		return (
			<TableRow key={invoiceId}>
				<td className='p-4'>{invoice.client}</td>
				<td className='p-4'>{invoice.industry}</td>
				<td className='p-4'>{invoice.totalHoursBilled}</td>
				<td className='p-4'>{invoice.amountBilledBAM}</td>
				<td className='p-4'>
					<div className='flex items-center gap-2'>
						<div className={`h-[6px] w-[6px] rounded-full ${getInvoiceColorAndStatus(invoice.invoiceStatus)?.color}`} />
						<div className='font-gilroy-semi-bold font-semibold'>
							{getInvoiceColorAndStatus(invoice.invoiceStatus)?.status}
						</div>
					</div>
				</td>
				<td className='p-3'>
					<div className='flex items-center gap-2'>
						<button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'>
							<img src={download} alt='Download icon' />
						</button>
						<button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'>
							<img src={dollar} alt='Dollar icon' />
						</button>
						<button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'>
							<img src={email} alt='Email icon' />
						</button>
						<button className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-ashen-grey'>
							<img src={trash} alt='Trash icon' />
						</button>
					</div>
				</td>
			</TableRow>
		);
	}, []);

	return (
		<Table
			label='All Invoices'
			total={totalNumberOfInvoices}
			value={value}
			columns={columns}
			orderByField={orderByField}
			orderDirection={orderDirection}
			handleSearch={handleSearch}
			handleSort={handleSort}
			rows={invoices.map(invoice => getInvoicesTableRow(invoice))}
		/>
	);
};

export default InvoicesTable;
