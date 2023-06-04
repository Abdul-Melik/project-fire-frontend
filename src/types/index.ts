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

type ProjectsInfo = {
	totalProjects: number;
	totalValue: number;
	averageValue: number;
	averageTeamSize: number;
	averageHourlyRate: number;
	salesChannelPercentage: { [key in SalesChannel]?: number };
	projectTypeCount: { [key in ProjectType]?: number };
	projects: [
		{
			name: string;
			hourlyRate: number;
			numberOfEmployees: number;
			revenue: number;
			cost: number;
			profit: number;
		}
	];
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
	Employee,
	EmployeesPerProject,
	SalesChannel,
	ProjectType,
	ProjectStatus,
	Project,
	ProjectsInfo,
	ChartData,
	SalesChannelCustomLabel,
	SalesChannelChartValues,
	ProjectScopeCustomLabel,
	ProjectScopeChartValues,
	RevenuesCostsPerMonthItemProps,
};
