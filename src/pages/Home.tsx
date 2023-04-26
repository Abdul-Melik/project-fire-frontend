import { useState, useEffect, useContext } from 'react';

import AuthContext from '../shared/context/auth-context';
import useHttpClient from '../shared/hooks/http-hook';
import InfoCard from '../shared/components/InfoCard';

interface ProjectInfo {
	totalProjects: number;
	totalValue: number;
	averageValue: number;
	averageHourlyRate: number;
	salesChannelPercentage: number[];
	projectTypeCount: number[];
}

const Home = () => {
	const { sendRequest } = useHttpClient();
	const auth = useContext(AuthContext);
	const [activeNav, setActiveNav] = useState(1);
	const [selectedYear, setSelectedYear] = useState('2023');
	const [projectsInfo, setProjectsInfo] = useState<ProjectInfo | null>(null);

	useEffect(() => {
		const opt1 = document.getElementById('opt-1')!;
		const opt2 = document.getElementById('opt-2')!;
		const opt3 = document.getElementById('opt-3')!;
		const contentHeading = document.getElementById('content-heading')!;

		opt1.addEventListener('click', () => {
			contentHeading.textContent = '2023 Performance TEST';
		});

		opt2.addEventListener('click', () => {
			contentHeading.textContent = 'Development Revenue & Costs TEST';
		});

		opt3.addEventListener('click', () => {
			contentHeading.textContent = '2023 Plan TEST';
		});
	}, []);

	useEffect(() => {
		const getProjectsInfo = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/projects/info?year=${selectedYear}`,
					'GET',
					null,
					{
						Authorization: 'Bearer ' + auth.token,
					}
				);
				setProjectsInfo(responseData);
			} catch (err) {
				console.log(err);
			}
		};
		getProjectsInfo();
	}, [sendRequest, auth.token, selectedYear]);

	return (
		<div className='page-content ml-4 mr-4 flex-1 p-4'>
			<div className='flex-1 p-8 py-4 text-3xl font-bold'>Home</div>
			<div className='content-categories flex'>
				<div className='flex-1 p-8 py-2'>
					<div className='flex items-center justify-between py-4'>
						<div className='flex'>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-1'
									className='sr-only'
									checked={activeNav === 1}
									onChange={() => setActiveNav(1)}
								/>
								<label
									htmlFor='opt-1'
									className={`cursor-pointer rounded-l border border-[#B3DFC9] ${
										activeNav === 1
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									2023 Performance
								</label>
							</div>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-2'
									className='sr-only'
									checked={activeNav === 2}
									onChange={() => setActiveNav(2)}
								/>
								<label
									htmlFor='opt-2'
									className={`cursor-pointer border-y border-[#B3DFC9] ${
										activeNav === 2
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									Development Revenue &amp; Costs
								</label>
							</div>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-3'
									className='sr-only'
									checked={activeNav === 3}
									onChange={() => setActiveNav(3)}
								/>
								<label
									htmlFor='opt-3'
									className={`cursor-pointer rounded-r border border-[#B3DFC9] ${
										activeNav === 3
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									2023 Plan
								</label>
							</div>
						</div>
						<div className='mr-5 flex items-center'>
							<label htmlFor='years' className='mr-4 font-medium'>
								Year:
							</label>
							<select
								className='rounded-md border border-gray-400 px-4 py-2 font-medium'
								name='years'
								id='years'
								value={selectedYear}
								onChange={event => setSelectedYear(event.target.value)}
							>
								<option value='2023'>2023</option>
								<option value='2022'>2022</option>
								<option value='2021'>2021</option>
								<option value='2020'>2020</option>
							</select>
						</div>
					</div>
					{activeNav === 1 && (
						<div className='grid gap-[30px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] auto-rows-[70px] mt-8'>
							<InfoCard
								description='Number of projects'
								amount={`${projectsInfo?.totalProjects}` ?? '0'}
								iconSrc='/svg/projectsno.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Total project value'
								amount={
									projectsInfo
										? projectsInfo.totalValue.toLocaleString('en-US', {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
										  }) + ' KM'
										: '0 KM'
								}
								iconSrc='/svg/totalvalue.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Avg. project value'
								amount={projectsInfo ? projectsInfo.averageValue.toLocaleString('en-US') + ' KM' : '0 KM'}
								iconSrc='/svg/avgvalue.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Avg. lead closing (d)'
								amount={'12'}
								iconSrc='/svg/leadclosing.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Avg. team size'
								amount={'2.2'}
								iconSrc='/svg/teamsize.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Avg. velocity'
								amount={'64'}
								iconSrc='/svg/velocity.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Weeks over deadline'
								amount={'7'}
								iconSrc='/svg/weeksover.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
							<InfoCard
								description='Avg. hourly price'
								amount={`$${projectsInfo?.averageHourlyRate}` ?? '$0'}
								iconSrc='/svg/hourlyprice.svg'
								iconAlt='Mini icon'
								className='border border-[#DFE3E1] rounded-md box-border'
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
