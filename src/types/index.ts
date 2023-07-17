type Role = "Admin" | "Guest";

type Department = "Administration" | "Management" | "Development" | "Design";

type Currency = "USD" | "EUR" | "BAM";

type TechStack = "AdminNA" | "MgmtNA" | "FullStack" | "Frontend" | "Backend" | "UXUI";

type ProjectType = "Fixed" | "OnGoing";

type SalesChannel = "Online" | "InPerson" | "Referral" | "Other";

type ProjectStatus = "Active" | "OnHold" | "Inactive" | "Completed";

type InvoiceStatus = "Paid" | "Sent" | "NotSent";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  image?: string;
  department: Department;
  salary: number;
  currency: Currency;
  techStack: TechStack;
  isEmployed: boolean;
  hiringDate: string;
  terminationDate?: string;
  projects: Projects[];
};

type Employees = {
  partTime: boolean;
  employee: Employee;
};

type EmployeeInfo = {
  month: string;
  totalHoursAvailable: number;
  totalHoursBilled: number;
  designCost: number;
  otherCost: number;
  developmentCost: number;
  totalCost: number;
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
  projectVelocity: number;
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

type ExpensesPerMonth = {
  year: number;
  month: string;
  marketingActualExpense: number;
  hrActualExpense: number;
  officeActualExpense: number;
  salesActualExpense: number;
  otherActualExpense: number;
  indirectActualExpense: number;
  plannedExpense: number;
  actualExpense: number;
};

type ExpensesInfo = {
  plannedExpense: number;
  monthsWithPlannedExpenses: string[];
  monthsWithActualExpenses: string[];
  totalMarketingActualExpense: number;
  totalHrActualExpense: number;
  totalOfficeActualExpense: number;
  totalSalesActualExpense: number;
  totalOtherActualExpense: number;
  totalIndirectActualExpense: number;
  totalMarketingPlannedExpense: number;
  totalHrPlannedExpense: number;
  totalOfficePlannedExpense: number;
  totalSalesPlannedExpense: number;
  totalOtherPlannedExpense: number;
  totalIndirectPlannedExpense: number;
  totalPlannedExpenses: number;
  totalActualExpenses: number;
  expensesPerMonth: ExpensesPerMonth[];
};

type ProjectInfo = {
  name: string;
  startDate: string;
  endDate: string;
  actualEndDate?: string;
  hourlyRate: number;
  projectVelocity: number;
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
  actualRevenue: number;
  plannedRevenue: number;
  plannedCost: number;
  revenueGap: number;
  actualMargin: number;
  directCost: number;
  indirectCost: number;
  actualAvgMargin: number;
  grossProfit: number;
  totalDirectCost: number;
  totalIndirectCost: number;
  averageRate: number;
  averageVelocity: number;
  weeksOverDeadline: number;
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
  invoiceStatus: InvoiceStatus;
};

export type {
  Role,
  Department,
  Currency,
  TechStack,
  ProjectType,
  SalesChannel,
  ProjectStatus,
  InvoiceStatus,
  Employee,
  Employees,
  EmployeeInfo,
  ExpensesPerMonth,
  ExpensesInfo,
  Project,
  Projects,
  ProjectInfo,
  ProjectsInfo,
  Invoice,
};
