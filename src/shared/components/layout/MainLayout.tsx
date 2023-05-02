import { useState, useCallback, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import AuthContext from '../../context/auth-context';
import * as assets from '../../../assets';
import Modal from '../utils/Modal';

type Props = {
	selectedButton: string;
	children: React.ReactNode;
};

const Layout = ({ selectedButton, children }: Props) => {
	const auth = useContext(AuthContext);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<any>(null);

	const getUserInfo = useCallback(async () => {
		try {
			const responseData = await axios.get(`http://localhost:5000/api/users/${auth.userId}`, {
				headers: { Authorization: 'Bearer ' + auth.token },
			});
			setUserInfo(responseData.data);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
		setIsLoading(false);
	}, [auth.token, auth.userId]);

	useEffect(() => {
		if (auth.token && auth.userId) getUserInfo();
	}, [auth.token, auth.userId]);

	return (
		<>
			<Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			{isLoading && (
				<div className='flex h-screen items-center justify-center'>
					<ClipLoader color='#43A57C' cssOverride={{ borderWidth: '5px' }} size={100} />
				</div>
			)}
			{!isLoading && (
				<div className='flex min-h-screen'>
					<div className='flex-col items-center gap-[10px] border-r border-opal-mist bg-gradient-to-b from-frost-white to-seafoam-green'>
						<img src={assets.logo} className='w-2/3 py-[30px] pl-7 pr-0' />
						<div className='mx-[14px] my-[10px] flex items-center justify-between gap-[13px] rounded-md border border-ashen-grey px-[14px] py-[10px]'>
							<div className='flex flex-wrap gap-[13px]'>
								<img
									className='h-[54px] w-[54px] rounded-lg object-cover'
									src={userInfo?.image ? userInfo.image : assets.avatar}
								/>
								<div className='flex flex-col gap-[3px]'>
									<div className='flex flex-wrap gap-[3px]'>
										<span className='whitespace-nowrap font-inter-medium text-base font-medium text-steel-blue'>
											{userInfo?.firstName}
										</span>
										<span className='whitespace-nowrap font-inter-medium text-base font-medium text-steel-blue'>
											{userInfo?.lastName}
										</span>
									</div>
									<span className='font-inter-regular text-[14px] font-normal leading-[18px] text-charcoal-grey'>
										{userInfo?.role === 'admin' ? 'Admin' : 'Employee'}
									</span>
								</div>
							</div>
							<img src={assets.arrow} className='cursor-pointer' />
						</div>
						<div className='flex flex-col gap-[8px] px-[14px] py-[10px] text-base'>
							<Link to='/home'>
								<div
									className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
										selectedButton === 'Home'
											? 'bg-winter-mint font-gilroy-bold font-bold'
											: 'font-gilroy-medium font-medium hover:bg-winter-mint'
									}`}
								>
									<img src={assets.home} className='h-5 w-5' />
									<p className='text-sm'>Home</p>
								</div>
							</Link>
							<Link to='/projects'>
								<div
									className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
										selectedButton === 'Projects'
											? 'bg-winter-mint font-gilroy-bold font-bold'
											: 'font-gilroy-medium font-medium hover:bg-winter-mint'
									}`}
								>
									<img src={assets.clipboard} className='h-5 w-5'></img>
									<p className='text-sm'>Projects</p>
								</div>
							</Link>
							<Link to='/employees'>
								<div
									className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
										selectedButton === 'Employees'
											? 'bg-winter-mint font-gilroy-bold font-bold'
											: 'font-gilroy-medium font-medium hover:bg-winter-mint'
									}`}
								>
									<img src={assets.employees} className='h-5 w-5'></img>
									<p className='text-sm'>Employees</p>
								</div>
							</Link>
							<Link to='/financial-overview'>
								<div
									className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
										selectedButton === 'FinancialOverview'
											? 'bg-winter-mint font-gilroy-bold font-bold'
											: 'font-gilroy-medium font-medium hover:bg-winter-mint'
									}`}
								>
									<img src={assets.coins} className='h-5 w-5'></img>
									<p className='text-sm'>Financial Overview</p>
								</div>
							</Link>
							<Link to='/project-reporting'>
								<div
									className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
										selectedButton === 'ProjectReporting'
											? 'bg-winter-mint font-gilroy-bold font-bold'
											: 'font-gilroy-medium font-medium hover:bg-winter-mint'
									}`}
								>
									<img src={assets.document} className='h-5 w-5' />
									<p className='text-sm'>Project Reporting</p>
								</div>
							</Link>
							<Link to='/invoicing'>
								<div
									className={`flex-start flex cursor-pointer items-center gap-[10px] rounded-md py-[12px] pl-[14px] pr-0 ${
										selectedButton === 'Invoicing'
											? 'bg-winter-mint font-gilroy-bold font-bold'
											: 'font-gilroy-medium font-medium hover:bg-winter-mint'
									}`}
								>
									<img src={assets.invoice} className='h-5 w-5' />
									<p className='text-sm'>Invoicing</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='flex-1'>{children}</div>
				</div>
			)}
		</>
	);
};

export default Layout;
