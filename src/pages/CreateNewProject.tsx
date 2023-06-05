import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { toast } from 'react-toastify';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import MainLayout from 'src/shared/components/layout/MainLayout';
import InputField from 'src/shared/components/form-elements/InputField';
import TextArea from 'src/shared/components/form-elements/TextArea';
import DateInput from 'src/shared/components/form-elements/DateInput';
import Radio from 'src/shared/components/form-elements/Radio';
import NumberInput from 'src/shared/components/form-elements/NumberInput';
import EmployeesTable from 'src/components/projects/table/EmployeesTable';
import Modal from 'src/shared/components/utils/Modal';

type ProjectType = 'Fixed' | 'OnGoing';

type SalesChannel = 'Online' | 'InPerson' | 'Referral' | 'Other';

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

const CreateNewProject = () => {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [dateRange, setDateRange] = useState<DateValueType | null>(null);
	const [actualEndDate, setActualEndDate] = useState<DateValueType | null>(null);
	const [projectType, setProjectType] = useState<ProjectType>('Fixed');
	const [salesChannel, setSalesChannel] = useState<SalesChannel>('Online');
	const [hourlyRate, setHourlyRate] = useState(0);
	const [projectValue, setProjectValue] = useState(0);
	const [openModal, setOpenModal] = useState(false);
	const [confirmData, setConfirmData] = useState(false);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
	const [employeesOnProject, setEmployeesOnProject] = useState<EmployeesPerProject[]>([]);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await axios.post(
				`${baseUrl}/api/projects`,
				{
					name,
					description,
					startDate: dateRange?.startDate,
					endDate: dateRange?.endDate,
					actualEndDate: actualEndDate?.startDate,
					projectType,
					hourlyRate,
					projectValueBAM: projectValue,
					salesChannel,
					employeesOnProject: employeesOnProject.map(employeeObj => ({
						employeeId: employeeObj.employee.id,
						partTime: employeeObj.partTime,
					})),
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + token,
					},
				}
			);
			navigate('/projects');
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
	};

	return (
		<>
			<Modal
				className='overflow-hidden rounded-md bg-white shadow-md'
				header='Choose Employees For Project'
				show={openModal}
				handleConfirmation={() => {
					setConfirmData(true);
				}}
				handleCancellation={() => {
					setOpenModal(false);
					setSelectedRows([]);
					setSelectedCheckboxes([]);
					setEmployeesOnProject([]);
					setConfirmData(false);
				}}
			>
				<EmployeesTable
					confirmData={confirmData}
					selectedRows={selectedRows}
					selectedCheckboxes={selectedCheckboxes}
					handleConfirmation={(employees: EmployeesPerProject[]) => {
						setEmployeesOnProject(employees);
						setOpenModal(false);
						setConfirmData(false);
					}}
					handleRowsSelection={rows => setSelectedRows(rows)}
					handleCheckboxesSelection={checkboxes => setSelectedCheckboxes(checkboxes)}
				/>
			</Modal>
			<MainLayout activeMenuItem={'projects'}>
				<div className='mx-14 my-[34px]'>
					<h1 className='mb-[30px] font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>
						Create New Project
					</h1>
					<form className='flex flex-col items-center justify-center gap-4 text-base' onSubmit={handleFormSubmit}>
						<div className='flex w-full flex-col gap-4 rounded-md border border-misty-lavender p-3'>
							<div className='flex h-full w-full gap-4'>
								<div className='flex flex-1 flex-col gap-4'>
									<InputField
										required
										label='Name'
										htmlFor='name'
										type='text'
										id='name'
										value={name}
										placeholder='Enter project name'
										handleInput={name => setName(name)}
									/>
									<TextArea
										label='Description'
										htmlFor='description'
										required
										id='description'
										value={description}
										placeholder='Enter project description'
										handleInput={description => setDescription(description)}
									/>
								</div>
								<div className='flex flex-1 flex-col gap-4'>
									<div className='flex flex-1 flex-col gap-[10px]'>
										<div className='font-gilroy-medium font-medium text-midnight-grey'>Project Type</div>
										<div className='flex items-center justify-center gap-6 rounded-md border border-misty-lavender p-3'>
											<Radio
												htmlFor='fixed'
												label='Fixed'
												checked={projectType === 'Fixed'}
												id='fixed'
												name='project-type'
												value={'Fixed'}
												handleChange={event => setProjectType(event.target.value as ProjectType)}
											/>
											<Radio
												htmlFor='on-going'
												label='On-going'
												checked={projectType === 'OnGoing'}
												id='on-going'
												name='project-type'
												value={'OnGoing'}
												handleChange={event => setProjectType(event.target.value as ProjectType)}
											/>
										</div>
									</div>
									<div className='flex flex-1 flex-col gap-[10px]'>
										<div className='font-gilroy-medium font-medium text-midnight-grey'>Sales Channel</div>
										<div className='flex items-center justify-center gap-6 rounded-md border border-misty-lavender p-3'>
											<Radio
												htmlFor='online'
												label='Online'
												checked={salesChannel === 'Online'}
												id='online'
												name='sales-channel'
												value={'Online'}
												handleChange={event => setSalesChannel(event.target.value as SalesChannel)}
											/>
											<Radio
												htmlFor='in-person'
												label='In-person'
												checked={salesChannel === 'InPerson'}
												id='in-person'
												name='sales-channel'
												value={'InPerson'}
												handleChange={event => setSalesChannel(event.target.value as SalesChannel)}
											/>
											<Radio
												htmlFor='refferal'
												label='Refferal'
												checked={salesChannel === 'Referral'}
												id='refferal'
												name='sales-channel'
												value={'Referral'}
												handleChange={event => setSalesChannel(event.target.value as SalesChannel)}
											/>
											<Radio
												htmlFor='other'
												label='Other'
												checked={salesChannel === 'Other'}
												id='other'
												name='sales-channel'
												value={'Other'}
												handleChange={event => setSalesChannel(event.target.value as SalesChannel)}
											/>
										</div>
									</div>
									<div className='flex w-full gap-4'>
										<NumberInput
											label='Hourly Rate'
											info=' (in USD)'
											htmlFor='hourly-rate'
											required
											id='hourly-rate'
											step={0.01}
											min={0}
											value={hourlyRate}
											handleInput={e => setHourlyRate(Number(e.target.value))}
										/>
										<NumberInput
											label='Project Value'
											info=' (in BAM)'
											htmlFor='project-value'
											required
											id='project-value'
											step={0.01}
											min={0}
											value={projectValue}
											handleInput={e => setProjectValue(Number(e.target.value))}
										/>
									</div>
								</div>
							</div>
							<div className='flex w-full gap-4'>
								<DateInput
									className='flex-1'
									label='Start & End Dates'
									seperator='-'
									value={dateRange}
									placeholder='Stard Date - End Date'
									handleChange={value => setDateRange(value)}
								/>
								<DateInput
									className='flex-1'
									label='Actual End Date'
									asSingle
									value={actualEndDate}
									placeholder='Actual End Date'
									handleChange={value => setActualEndDate(value)}
								/>
							</div>
						</div>
						<div className='flex w-2/3 gap-4 self-start font-gilroy-semi-bold font-semibold'>
							<div
								className='flex flex-1 items-center justify-center rounded-md bg-golden-tangerine px-4 py-2 text-midnight-grey hover:cursor-pointer hover:saturate-150'
								onClick={() => setOpenModal(true)}
							>
								Add employees
							</div>
							<button
								className='flex-1 rounded-md bg-deep-teal px-[10px] py-3 text-white hover:saturate-[400%]'
								type='submit'
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</MainLayout>
		</>
	);
};

export default CreateNewProject;
