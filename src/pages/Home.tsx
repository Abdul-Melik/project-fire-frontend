import { useState, useCallback, useEffect, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../shared/context/auth-context';
import Modal from '../shared/components/utils/Modal';
import Layout from '../shared/components/layout/MainLayout';
import Navbar from '../shared/components/navbar/Navbar';
import YearFilter from '../shared/components/utils/YearFilter';
import Performance from '../components/home/Performance';
import DevelopmentRevenueCosts from '../components/home/DevelopmentRevenueCosts';
import Plan from '../components/home/Plan';

interface ProjectInfo {
	totalProjects: number;
	totalValue: number;
	averageValue: number;
	averageHourlyRate: number;
	salesChannelPercentage: { salesChannel: string; percentage: number }[];
	projectTypeCount: { count: number; projectType: string }[];
}

const Home = () => {
	const auth = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);
	const [projectsInfo, setProjectsInfo] = useState<ProjectInfo | null>(null);
	const [selectedYear, setSelectedYear] = useState('2023');
	const [activePage, setActivePage] = useState(1);

	const getProjectsInfo = useCallback(async () => {
		try {
			const response = await axios.get(`http://localhost:5000/api/projects/info?year=${selectedYear}`, {
				headers: { Authorization: 'Bearer ' + auth.token },
			});
			setProjectsInfo(response.data);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
	}, [auth.token, selectedYear]);

	useEffect(() => {
		if (auth.token && selectedYear) getProjectsInfo();
	}, [auth.token, selectedYear]);

	return (
		<>
			<Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			<Layout selectedButton={'Home'}>
				<div className='page-content mx-14 my-[34px]'>
					<div className='flex-1 font-gilroy-bold text-3xl font-bold leading-[40px] text-deep-forest'>Home</div>
					<div className='mt-[30px] flex flex-col'>
						<div className='mb-12 flex flex-wrap justify-between gap-4'>
							<Navbar selectedYear={selectedYear} handlePageSelect={page => setActivePage(page)} />
							<YearFilter handleYearSelect={year => setSelectedYear(year)} />
						</div>
						{activePage === 1 && <Performance projectsInfo={projectsInfo} />}
						{activePage === 2 && <DevelopmentRevenueCosts />}
						{activePage === 3 && <Plan />}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Home;
