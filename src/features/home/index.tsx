import { useState } from 'react';

import { useGetProjectsInfoQuery } from 'store/slices/projectsApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import MainLayout from 'components/layout';
import Navbar from 'components/navigation/NavBar';
import YearSelector from 'components/selectors/YearSelector';
import Performance from 'features/home/Performance';
import DevelopmentRevenueCosts from 'features/home/DevelopmentRevenueCosts';
import Plan from 'features/home/Plan';

const Home = () => {
	const [year, setYear] = useState('2023');
	const [activePage, setActivePage] = useState(1);

	const {
		isLoading,
		isFetching,
		isSuccess,
		data: projectsInfo,
	} = useGetProjectsInfoQuery(
		{ year },
		{
			pollingInterval: 60000,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		}
	);

	const navLabels = [`${year}  Performance`, 'Development Revenue & Costs', `${year} Plan`];

	return (
		<MainLayout activeMenuItem={'home'}>
			<div className='mx-14 my-[34px]'>
				<h1 className='flex-1 font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Home</h1>
				<div className='mt-[30px] flex flex-col'>
					<div className='mb-12 flex flex-wrap justify-between gap-4'>
						<Navbar navLabels={navLabels} handlePageSelect={page => setActivePage(page)} />
						<YearSelector year={year} handleYearSelection={year => setYear(year)} />
					</div>
					{isLoading || isFetching ? (
						<LoadingSpinner />
					) : (
						isSuccess && (
							<>
								{activePage === 1 && <Performance projectsInfo={projectsInfo} />}
								{activePage === 2 && <DevelopmentRevenueCosts />}
								{activePage === 3 && <Plan />}
							</>
						)
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;
