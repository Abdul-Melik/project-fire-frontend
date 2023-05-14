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
		<div className='flex items-center'>
			<h2 className='px-4 py-[23px] font-gilroy-medium text-lg'>Projects Table</h2>
			<div className='flex h-[30px] items-center bg-[#F5FFFA]'>
				<h2 className='px-4 text-center font-gilroy-medium text-sm text-moss-green'>{totalNumberOfProjects} total</h2>
			</div>
			<div className='relative ml-auto mr-4 rounded-[4px]'>
				<form
					onSubmit={event => {
						event.preventDefault();
						handleSearch(input);
					}}
				>
					<input
						className='font-gilroy h-10 w-[315px] rounded-sm border border-ashen-grey pl-[46px] text-[#57585F]'
						placeholder='Search'
						value={input}
						onChange={event => setInput(event.target.value)}
					/>
					<img
						src={search}
						className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer'
						alt='search-icon'
					/>
				</form>
			</div>
		</div>
	);
};

export default TableHeader;
