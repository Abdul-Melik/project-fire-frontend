// Performance Tab
const hoursOverviewChart = [
	{ month: 'January: 1/1/2023', 'Grand Total Hours Available': 3310, 'Grand Total Hours Billed': 450 },
	{ month: 'March: 1/3/2023', 'Grand Total Hours Available': 4433, 'Grand Total Hours Billed': 705 },
	{ month: 'May: 1/5/2023', 'Grand Total Hours Available': 3000, 'Grand Total Hours Billed': 3001 },
	{ month: 'July: 1/7/2023', 'Grand Total Hours Available': 300, 'Grand Total Hours Billed': 4225 },
	{ month: 'September: 1/9/2023', 'Grand Total Hours Available': 1080, 'Grand Total Hours Billed': 5000 },
	{ month: 'November: 1/11/2023', 'Grand Total Hours Available': 1501, 'Grand Total Hours Billed': 610 },
];

// Development Revenue & Costs Tab
const revenuesCostsActualChart = [
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

const revenuesCostsPerMonthChart = {
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

export { hoursOverviewChart, revenuesCostsActualChart, revenuesCostsPerMonthChart };
