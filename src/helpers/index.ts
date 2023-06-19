import { TechStack, ProjectStatus, Invoice } from 'src/types';

export const getEmployeeTechStack = (techStack: TechStack) => {
	if (techStack === 'AdminNA' || techStack === 'MgmtNA') return 'N/A';
	if (techStack === 'FullStack') return 'Full Stack';
	if (techStack === 'Backend') return 'Back End';
	if (techStack === 'Frontend') return 'Front End';
	if (techStack === 'UXUI') return 'UX/UI';
	return null;
};

export const getProjectDate = (startDateString: string, endDateString: string) => {
	const startDate = new Date(startDateString);
	const endDate = new Date(endDateString);
	const startDateFormattedString = startDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	const endDateFormattedString = endDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	return startDateFormattedString + ' - ' + endDateFormattedString;
};

export const getProjectValueBAM = (projectValueBAM: number) => {
	return projectValueBAM.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

export const getProjectColorAndStatus = (projectStatus: ProjectStatus) => {
	if (projectStatus === 'Active') return { color: 'bg-spring-fern', status: 'Active' };
	if (projectStatus === 'OnHold') return { color: 'bg-golden-tangerine', status: 'On hold' };
	if (projectStatus === 'Inactive') return { color: 'bg-silver-mist', status: 'Inactive' };
	if (projectStatus === 'Completed') return { color: 'bg-cerulean-breeze', status: 'Completed' };
	return null;
};

export const handleInvoicesData = (
	invoicesData: Invoice[],
	invoiceStatus: string,
	searchTerm: string,
	orderByField: string,
	orderDirection: string
) => {
	return invoicesData
		.filter(invoice => (invoiceStatus ? invoice.invoiceStatus === invoiceStatus : true))
		.filter(invoice => (searchTerm ? invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) : true))
		.sort((a, b) => {
			const sortValueA =
				orderByField === 'client' || orderByField === 'industry'
					? a[orderByField].localeCompare(b[orderByField])
					: orderByField === 'totalHoursBilled'
					? a.totalHoursBilled - b.totalHoursBilled
					: orderByField === 'amountBilledBAM'
					? a.amountBilledBAM - b.amountBilledBAM
					: ['Paid', 'Sent', 'NotSent'].indexOf(a.invoiceStatus) - ['Paid', 'Sent', 'NotSent'].indexOf(b.invoiceStatus);

			return orderDirection === 'asc' ? sortValueA : -sortValueA;
		});
};

export const getInvoiceColorAndStatus = (invoiceStatus: string) => {
	if (invoiceStatus === 'Paid') return { color: 'bg-spring-fern', status: 'Paid' };
	if (invoiceStatus === 'Sent') return { color: 'bg-golden-tangerine', status: 'Sent' };
	if (invoiceStatus === 'NotSent') return { color: 'bg-silver-mist', status: 'Not sent' };
	return null;
};
