import { useState, useEffect, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

import AuthContext from '../shared/context/auth-context';
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
	salesChannelPercentage: number[];
	projectTypeCount: number[];
}

const Home = () => {
	const auth = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [projectsInfo, setProjectsInfo] = useState<ProjectInfo | null>(null);
	const [selectedYear, setSelectedYear] = useState('2023');
	const [activePage, setActivePage] = useState(`${selectedYear}  Performance`);

	useEffect(() => {
		const getProjectsInfo = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/api/projects/info?year=${selectedYear}`, {
					headers: { Authorization: 'Bearer ' + auth.token },
				});
				setProjectsInfo(response.data);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		getProjectsInfo();
	}, [auth.token, selectedYear]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ClipLoader color='#43A57C' cssOverride={{ borderWidth: '5px' }} size={100} />
			</div>
		);
	}

	return (
		<Layout selectedButton={'Home'}>
			<div className='page-content ml-4 mr-4 p-4'>
				<div className='flex-1 p-8 py-4 text-3xl font-bold font-gilroy-bold'>Home</div>
				<div className='content-categories flex flex-col'>
					<div className='flex justify-between'>
						<Navbar selectedYear={selectedYear} handlePageSelect={page => setActivePage(page)} />
						<YearFilter handleYearSelect={year => setSelectedYear(year)} />
					</div>
					{activePage === `${selectedYear}  Performance` && <Performance projectsInfo={projectsInfo} />}
					{activePage === 'Development Revenue &amp; Costs' && <DevelopmentRevenueCosts projectsInfo={projectsInfo} />}
					{activePage === `${selectedYear} Plan` && <Plan projectsInfo={projectsInfo} />}
				</div>
			</div>
		</Layout>
	);
};

export default Home;
