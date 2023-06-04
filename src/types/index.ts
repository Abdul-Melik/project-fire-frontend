// Project Types
type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';

type ProjectType = 'Fixed' | 'OnGoing';

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

export type {
	SalesChannel,
	ProjectType,
	ProjectsInfo,
	ChartData,
	SalesChannelCustomLabel,
	SalesChannelChartValues,
	ProjectScopeCustomLabel,
	ProjectScopeChartValues,
};
