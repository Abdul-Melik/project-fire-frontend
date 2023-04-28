import { useState } from 'react';

import NavLink from './NavLink';

type Props = {
	selectedYear: string;
	handlePageSelect: (page: string) => void;
};

const Navbar = ({ selectedYear, handlePageSelect }: Props) => {
	const [selectedPage, setSelectedPage] = useState(`${selectedYear}  Performance`);
	const activeLink = 'bg-pale-jade text-moss-green font-inter-semi-bold font-semibold';
	const inactiveLink = 'text-blue-grey font-inter-regular font-normal';

	return (
		<div className='flex items-center justify-between py-4'>
			<div className='flex'>
				<NavLink
					text={`${selectedYear}  Performance`}
					onClick={() => {
						handlePageSelect(`${selectedYear}  Performance`);
						setSelectedPage(`${selectedYear}  Performance`);
					}}
					className={`${
						selectedPage === `${selectedYear}  Performance` ? activeLink : inactiveLink
					} rounded-l border-r-0`}
				/>
				<NavLink
					text='Development Revenue &amp; Costs'
					onClick={() => {
						handlePageSelect('Development Revenue &amp; Costs');
						setSelectedPage('Development Revenue &amp; Costs');
					}}
					className={selectedPage === 'Development Revenue &amp; Costs' ? activeLink : inactiveLink}
				/>
				<NavLink
					text={`${selectedYear} Plan`}
					onClick={() => {
						handlePageSelect(`${selectedYear} Plan`);
						setSelectedPage(`${selectedYear} Plan`);
					}}
					className={`${selectedPage === `${selectedYear} Plan` ? activeLink : inactiveLink} rounded-r border-l-0`}
				/>
			</div>
		</div>
	);
};

export default Navbar;
