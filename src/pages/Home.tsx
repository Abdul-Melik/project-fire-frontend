import { useState, useCallback, useEffect, useContext } from 'react';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import Modal from 'src/shared/components/utils/Modal';
import YearSelector from 'src/shared/components/utils/YearSelector';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import MainLayout from 'src/shared/components/layout/MainLayout';
import Navbar from 'src/shared/components/navbar/Navbar';
import Performance from 'src/components/home/performance/Performance';
import DevelopmentRevenueCosts from 'src/components/home/development-revenue-costs/DevelopmentRevenueCosts';
import Plan from 'src/components/home/plan/Plan';

interface ProjectInfo {
	totalProjects: number;
	totalValue: number;
	averageValue: number;
	averageHourlyRate: number;
	salesChannelPercentage: { salesChannel: string; percentage: number }[];
	projectTypeCount: { count: number; projectType: string }[];
}

const Home = () => {
	const { token } = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [projectsInfo, setProjectsInfo] = useState<ProjectInfo | null>(null);
	const [selectedYear, setSelectedYear] = useState('2023');
	const [activePage, setActivePage] = useState(1);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getProjectsInfo = useCallback(async () => {
		try {
			const response = await axios.get(`${baseUrl}/api/projects/info?year=${selectedYear}`, {
				headers: { Authorization: 'Bearer ' + token },
			});
			setProjectsInfo(response.data);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
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
			<Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			<MainLayout activeMenuItem={'home'}>
				<div className='mx-14 my-[34px]'>
					<div className='flex-1 font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Home</div>
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
