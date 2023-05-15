import { useState } from 'react';
import { search } from 'src/assets';

interface Project {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	actualEndDate: Date;
	projectStatus: string;
	hourlyRate: number;
	projectValueBAM: number;
	finished: boolean;
	employees: [
		{
			employee: {
				_id: string;
				firstName: string;
				lastName: string;
				department: string;
				salary: number;
				techStack: string[];
				__v: number;
			};
		}
	];
}

type Props = {
	totalNumberOfProjects: number;
	data: Project[];
	handleSearch: (input: string) => void;
};

const TableHeader = ({ totalNumberOfProjects, handleSearch }: Props) => {
	const [input, setInput] = useState('');

	return (
		<div className='flex items-center justify-between px-4'>
			<div className='flex items-center gap-4 py-[23px]'>
				<h2 className='leadin-[26px] font-gilroy-medium text-lg font-medium text-midnight-grey'>Projects Table</h2>
				<div className='flex h-[30px] flex-col items-center justify-center rounded-md bg-aqua-haze px-[10px] py-[2px] font-gilroy-medium text-sm font-medium leading-[18px] text-moss-green'>
					{totalNumberOfProjects} total
				</div>
			</div>
			<form
				className='relative'
				onSubmit={event => {
					event.preventDefault();
					handleSearch(input);
				}}
			>
				<input
					className='h-10 w-[315px] rounded-sm border border-ashen-grey pl-[46px] font-inter-regular text-sm font-normal leading-[22px] text-charcoal-grey placeholder:font-inter-regular placeholder:text-sm placeholder:font-normal placeholder:leading-[22px] placeholder:text-charcoal-grey'
					placeholder='Search'
					value={input}
					onChange={event => setInput(event.target.value)}
				/>
				<img src={search} className='absolute left-3 top-2 h-6 w-6 cursor-pointer' alt='Search icon' />
			</form>
		</div>
	);
};

export default TableHeader;
