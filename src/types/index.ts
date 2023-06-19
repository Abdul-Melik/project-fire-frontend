type Department = 'Administration' | 'Management' | 'Development' | 'Design';

type TechStack = 'AdminNA' | 'MgmtNA' | 'FullStack' | 'Frontend' | 'Backend' | 'UXUI';

type ProjectType = 'Fixed' | 'OnGoing';

type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';

type ProjectStatus = 'Active' | 'OnHold' | 'Inactive' | 'Completed';

type Employee = {
	id: string;
	firstName: string;
	lastName: string;
	image?: string;
	department: Department;
	salary: number;
	techStack: TechStack;
	projects: Projects[];
};

type Employees = {
	partTime: boolean;
	employee: Employee;
};

type Project = {
	id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	actualEndDate?: string;
	projectType: ProjectType;
	hourlyRate: number;
	projectValueBAM: number;
	salesChannel: SalesChannel;
	projectStatus: ProjectStatus;
	employees: Employees[];
};

type Projects = {
	partTime: boolean;
	project: {
		id: string;
		name: string;
	};
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
	averageRate: number;
	salesChannelPercentage: { [key in SalesChannel]?: number };
	projectTypeCount: { [key in ProjectType]?: number };
	projects: ProjectInfo[];
};

type Invoice = {
	id: string;
	client: string;
	industry: string;
	totalHoursBilled: number;
	amountBilledBAM: number;
	invoiceStatus: string;
};

export type {
	Department,
	TechStack,
	ProjectType,
	SalesChannel,
	ProjectStatus,
	Employee,
	Employees,
	Project,
	Projects,
	ProjectInfo,
	ProjectsInfo,
	Invoice,
};
