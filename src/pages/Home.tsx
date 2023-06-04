import { useState, useCallback, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { ProjectsInfo } from 'src/types';
import AuthContext from 'src/shared/context/auth-context';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import MainLayout from 'src/shared/components/layout/MainLayout';
import Navbar from 'src/shared/components/navbar/Navbar';
import Performance from 'src/components/home/performance/Performance';
import YearSelector from 'src/components/home/performance/YearSelector';
import DevelopmentRevenueCosts from 'src/components/home/development-revenue-costs/DevelopmentRevenueCosts';
import Plan from 'src/components/home/plan/Plan';

const Home = () => {
	const { token } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [projectsInfo, setProjectsInfo] = useState<ProjectsInfo | null>(null);
	const [selectedYear, setSelectedYear] = useState('2023');
	const [activePage, setActivePage] = useState(1);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getProjectsInfo = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/projects/info?year=${selectedYear}`, {
				headers: { Authorization: 'Bearer ' + token },
			});
			setProjectsInfo(response.data);
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
		setIsLoading(false);
	}, [token, selectedYear]);

	useEffect(() => {
		if (token && selectedYear) getProjectsInfo();
	}, [token, selectedYear]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navLabels = [`${selectedYear}  Performance`, 'Development Revenue & Costs', `${selectedYear} Plan`];

	return (
		<>
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
								{activePage === 1 && <Performance projectsInfo={projectsInfo} />}
								{activePage === 2 && <DevelopmentRevenueCosts />}
								{activePage === 3 && <Plan />}
							</>
						)}
					</div>
				</div>
			</MainLayout>
		</>
	);
};

export default Home;
