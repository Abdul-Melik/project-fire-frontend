// Chart Data
const hoursOverviewChartData = [
	{ month: 'January: 1/1/2023', 'Grand Total Hours Available': 3310, 'Grand Total Hours Billed': 450 },
	{ month: 'March: 1/3/2023', 'Grand Total Hours Available': 4433, 'Grand Total Hours Billed': 705 },
	{ month: 'May: 1/5/2023', 'Grand Total Hours Available': 3000, 'Grand Total Hours Billed': 3001 },
	{ month: 'July: 1/7/2023', 'Grand Total Hours Available': 300, 'Grand Total Hours Billed': 4225 },
	{ month: 'September: 1/9/2023', 'Grand Total Hours Available': 1080, 'Grand Total Hours Billed': 5000 },
	{ month: 'November: 1/11/2023', 'Grand Total Hours Available': 1501, 'Grand Total Hours Billed': 610 },
];

const revenuesCostsActualChartData = [
	{
		organisation: 'AlphaBid',
		'Grand Total Total Billed': 125310,
		'Grand Total Costs': 434450,
	},
	{
		organisation: 'Audiowolf',
		'Grand Total Total Billed': 554433,
		'Grand Total Costs': 233705,
	},
	{
		organisation: 'GIZ',
		'Grand Total Total Billed': 223000,
		'Grand Total Costs': 113001,
	},
	{
		organisation: 'HUB71',
		'Grand Total Total Billed': 334300,
		'Grand Total Costs': 444225,
	},
	{
		organisation: 'Kutuby',
		'Grand Total Total Billed': 111080,
		'Grand Total Costs': 345000,
	},
	{
		organisation: 'Travelspot',
		'Grand Total Total Billed': 441501,
		'Grand Total Costs': 111610,
	},
	{
		organisation: 'Virgin Pulse',
		'Grand Total Total Billed': 111501,
		'Grand Total Costs': 444610,
	},
	{
		organisation: 'Zeppelin (CAT)',
		'Grand Total Total Billed': 551501,
		'Grand Total Costs': 62210,
	},
];

const revenuesCostsPerMonthChartData = {
	data: [
		[
			{
				month: 'January: 1/1/2023',
				'Grand Total Planned Revenue': 210000,
				'Grand Total Actual Revenue': 210000,
				'Grand Total Total Expenses (Planned)': 150000,
				'Grand Total Total Expenses (Actual)': 260000,
			},
		],
		[
			{
				month: 'February: 1/2/2023',
				'Grand Total Planned Revenue': 210000,
				'Grand Total Actual Revenue': 210000,
				'Grand Total Total Expenses (Planned)': 150000,
				'Grand Total Total Expenses (Actual)': 260000,
			},
		],
		[
			{
				month: 'March: 1/3/2023',
				'Grand Total Planned Revenue': 210000,
				'Grand Total Actual Revenue': 210000,
				'Grand Total Total Expenses (Planned)': 150000,
				'Grand Total Total Expenses (Actual)': 260000,
			},
		],
	],
	revenueGap: ['914.00 KM', '10,000.00 KM', '-15,000.00 KM'],
};

// Invoices Data
const invoicesData = [
	{
		id: '1',
		client: 'Gerlach - Mills',
		industry: 'Tools',
		totalHoursBilled: 1863,
		amountBilledBAM: 126000.45,
		invoiceStatus: 'Sent',
	},
	{
		id: '2',
		client: 'Cartwright - Veum',
		industry: 'Garden',
		totalHoursBilled: 32103,
		amountBilledBAM: 160000.08,
		invoiceStatus: 'Paid',
	},
	{
		id: '3',
		client: 'Donnelly - Heidenreich',
		industry: 'Health',
		totalHoursBilled: 89384,
		amountBilledBAM: 319000.76,
		invoiceStatus: 'Paid',
	},
	{
		id: '4',
		client: 'Hyatt - Trantow',
		industry: 'Health',
		totalHoursBilled: 87105,
		amountBilledBAM: 823000.26,
		invoiceStatus: 'Paid',
	},
	{
		id: '5',
		client: 'Lind Inc',
		industry: 'Electronics',
		totalHoursBilled: 39883,
		amountBilledBAM: 273000.42,
		invoiceStatus: 'Sent',
	},
	{
		id: '6',
		client: 'Hartmann LLC',
		industry: 'Baby',
		totalHoursBilled: 24919,
		amountBilledBAM: 532000.6,
		invoiceStatus: 'Sent',
	},
	{
		id: '7',
		client: 'Gottlieb Group',
		industry: 'Home',
		totalHoursBilled: 21828,
		amountBilledBAM: 685000.33,
		invoiceStatus: 'Paid',
	},
	{
		id: '8',
		client: 'Metz - Schmitt',
		industry: 'Clothing',
		totalHoursBilled: 76945,
		amountBilledBAM: 890000.3,
		invoiceStatus: 'NotSent',
	},
	{
		id: '9',
		client: 'Monahan and Sons',
		industry: 'Home',
		totalHoursBilled: 42348,
		amountBilledBAM: 284000.82,
		invoiceStatus: 'NotSent',
	},
	{
		id: '10',
		client: 'Gerlach - VonRueden',
		industry: 'Outdoors',
		totalHoursBilled: 413,
		amountBilledBAM: 405000.2,
		invoiceStatus: 'Sent',
	},
	{
		id: '11',
		client: 'Breitenberg Inc',
		industry: 'Books',
		totalHoursBilled: 28729,
		amountBilledBAM: 762000.62,
		invoiceStatus: 'NotSent',
	},
];

export { hoursOverviewChartData, revenuesCostsActualChartData, revenuesCostsPerMonthChartData, invoicesData };
