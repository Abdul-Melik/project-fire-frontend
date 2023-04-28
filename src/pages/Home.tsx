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
	salesChannelPercentage: { salesChannel: string; percentage: number }[];
	projectTypeCount: { count: number; projectType: string }[];
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
			<div className='page-content mx-14 my-[34px]'>
				<div className='flex-1 text-3xl leading-[40px] text-deep-forest font-bold font-gilroy-bold'>Home</div>
				<div className='flex flex-col mt-[30px]'>
					<div className='flex justify-between mb-12'>
						<Navbar selectedYear={selectedYear} handlePageSelect={page => setActivePage(page)} />
						<YearFilter handleYearSelect={year => setSelectedYear(year)} />
					</div>
					{activePage === `${selectedYear}  Performance` && <Performance projectsInfo={projectsInfo} />}
					{activePage === 'Development Revenue &amp; Costs' && <DevelopmentRevenueCosts />}
					{activePage === `${selectedYear} Plan` && <Plan />}
				</div>
			</div>
		</Layout>
	);
};

export default Home;
