import { useState } from 'react';

import NavLink from './NavLink';

type Props = {
	selectedYear: string;
	handlePageSelect: (page: number) => void;
};

const Navbar = ({ selectedYear, handlePageSelect }: Props) => {
	const [selectedPage, setSelectedPage] = useState(1);
	const activeLink = 'bg-pale-jade text-moss-green font-inter-semi-bold font-semibold';
	const inactiveLink = 'text-blue-grey font-inter-regular font-normal';

	return (
		<div className='flex items-center justify-between'>
			<div className='flex-start flex'>
				<NavLink
					text={`${selectedYear}  Performance`}
					onClick={() => {
						handlePageSelect(1);
						setSelectedPage(1);
					}}
					className={`${selectedPage === 1 ? activeLink : inactiveLink} rounded-l border-r-0`}
				/>
				<NavLink
					text='Development Revenue &amp; Costs'
					onClick={() => {
						handlePageSelect(2);
						setSelectedPage(2);
					}}
					className={selectedPage === 2 ? activeLink : inactiveLink}
				/>
				<NavLink
					text={`${selectedYear} Plan`}
					onClick={() => {
						handlePageSelect(3);
						setSelectedPage(3);
					}}
					className={`${selectedPage === 3 ? activeLink : inactiveLink} rounded-r border-l-0`}
				/>
			</div>
		</div>
	);
};

export default Navbar;
