import { useState, useEffect } from 'react';

import { useGetProjectsInfoQuery } from 'store/slices/projectsApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout/MainLayout';
import Navbar from 'components/navbar/Navbar';
import Performance from 'features/home/Performance';
import YearSelector from 'components/utils/YearSelector';
import DevelopmentRevenueCosts from 'features/home/DevelopmentRevenueCosts';
import Plan from 'features/home/Plan';

const Home = () => {
	const [selectedYear, setSelectedYear] = useState('2023');
	const [activePage, setActivePage] = useState(1);

	const { data, isLoading } = useGetProjectsInfoQuery(selectedYear);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navLabels = [`${selectedYear}  Performance`, 'Development Revenue & Costs', `${selectedYear} Plan`];

	return (
		<MainLayout activeMenuItem={'home'}>
			<div className='mx-14 my-[34px]'>
				<h1 className='flex-1 font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Home</h1>
				<div className='mt-[30px] flex flex-col'>
					<div className='mb-12 flex flex-wrap justify-between gap-4'>
						<Navbar navLabels={navLabels} handlePageSelect={page => setActivePage(page)} />
						<YearSelector handleYearSelect={year => setSelectedYear(year)} />
					</div>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<>
							{activePage === 1 && <Performance projectsInfo={data} />}
							{activePage === 2 && <DevelopmentRevenueCosts />}
							{activePage === 3 && <Plan />}
						</>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;
