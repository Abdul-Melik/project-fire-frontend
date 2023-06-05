// General Types
type HeadObject = {
	name: string;
	label: string;
};

type TableHeadProps = {
	columns: HeadObject[];
	orderByField: string;
	orderDirection: string;
	handleSort: (label: string, orderDirection: string) => void;
};

// Employee Types
type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
	department: string;
	salary: number;
	techStack: string[];
};

type EmployeesPerProject = {
	partTime: boolean;
	employee: Employee;
};

type EmployeesTableProps = {
	confirmData: boolean;
	selectedRows: string[];
	selectedCheckboxes: string[];
	handleConfirmation: (employees: EmployeesPerProject[]) => void;
	handleRowsSelection: (rows: string[]) => void;
	handleCheckboxesSelection: (checkboxes: string[]) => void;
};

// Project Types
type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';

type ProjectType = 'Fixed' | 'OnGoing';

type ProjectStatus = 'Active' | 'OnHold' | 'Inactive' | 'Completed';

type Project = {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	actualEndDate: string;
	projectType: ProjectType;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: SalesChannel;
	projectStatus: ProjectStatus;
	employees: EmployeesPerProject[];
};

type ProjectInfo = {
	name: string;
	hourlyRate: number;
	numberOfEmployees: number;
	revenue: number;
	cost: number;
	profit: number;
};

type ProjectsInfo = {
	totalProjects: number;
	totalValue: number;
	averageValue: number;
	averageTeamSize: number;
	averageHourlyRate: number;
	salesChannelPercentage: { [key in SalesChannel]?: number };
	projectTypeCount: { [key in ProjectType]?: number };
	projects: ProjectInfo[];
};

type ProjectsTableProps = {
	totalNumberOfProjects: number;
	projects: Project[];
	value: string;
	orderByField: string;
	orderDirection: string;
	handleSearch: (input: string) => void;
	handleSort: (label: string, orderDirection: string) => void;
};

// Chart Types
type ChartData = {
	name: string;
	value: number;
};

type SalesChannelCustomLabel = {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
};

type SalesChannelChartValues = {
	chartValues: { [key in SalesChannel]?: number };
};

type ProjectScopeCustomLabel = { x: number; y: number; value: number };

type ProjectScopeChartValues = {
	chartValues: { [key in ProjectType]?: number };
};

type RevenuesCostsPerMonthItemProps = {
	className?: string;
	wrapperClassName?: string;
	item: number;
	data: any[];
	revenueGap: string;
	tickNumbers?: boolean;
};

export type {
	HeadObject,
	TableHeadProps,
	Employee,
	EmployeesPerProject,
	EmployeesTableProps,
	SalesChannel,
	ProjectType,
	ProjectStatus,
	Project,
	ProjectInfo,
	ProjectsInfo,
	ProjectsTableProps,
	ChartData,
	SalesChannelCustomLabel,
	SalesChannelChartValues,
	ProjectScopeCustomLabel,
	ProjectScopeChartValues,
	RevenuesCostsPerMonthItemProps,
};
