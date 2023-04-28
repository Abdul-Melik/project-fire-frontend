import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import AuthContext from '../../context/auth-context';
import * as assets from '../../../assets';

type Props = {
	selectedButton: string;
	children: React.ReactNode;
};

const Layout = ({ selectedButton, children }: Props) => {
	const auth = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<any>(null);

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const responseData = await axios.get(`http://localhost:5000/api/users/${auth.userId}`, {
					headers: { Authorization: 'Bearer ' + auth.token },
				});
				setUserInfo(responseData.data);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		getUserInfo();
	}, [auth.token, auth.userId]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<ClipLoader color='#43A57C' cssOverride={{ borderWidth: '5px' }} size={100} />
			</div>
		);
	}

	return (
		<div className='flex min-h-screen min-w-[1280px]'>
			<div className='w-[284px] gap-[10px] flex-col items-center border-r border-opal-mist bg-gradient-to-b from-frost-white to-seafoam-green'>
				<img src={assets.logo} className='w-2/3 py-[30px] pr-0 pl-7' />
				<div className='flex gap-[13px] border-ashen-grey mx-[14px] my-[10px] px-[14px] py-[10px] items-center rounded-md border'>
					<img
						className='h-[54px] w-[54px] rounded-lg object-cover'
						src={userInfo.image ? userInfo.image : assets.avatar}
					/>
					<div className='flex-col flex-start'>
						<p className='font-inter-medium font-medium text-base mb-[3px] text-steel-blue'>{`${userInfo.firstName} ${userInfo.lastName}`}</p>
						<p className='font-normal font-inter-regular text-[14px] leading-[18px] text-charcoal-grey'>
							{userInfo.role === 'admin' ? 'Admin' : 'Employee'}
						</p>
					</div>
					<img src={assets.arrow} className='cursor-pointer pl-3' />
				</div>
				<div className='flex flex-col px-[14px] py-[10px] gap-[8px] text-base'>
					<Link to='/home'>
						<div
							className={`flex flex-start gap-[10px] py-[12px] pl-[14px] pr-0 cursor-pointer items-center rounded-md ${
								selectedButton === 'Home'
									? 'bg-winter-mint font-bold font-gilroy-bold'
									: 'font-medium font-gilroy-medium hover:bg-winter-mint'
							}`}
						>
							<img src={assets.home} className='h-5 w-5' />
							<p className='text-sm'>Home</p>
						</div>
					</Link>
					<Link to='/projects'>
						<div
							className={`flex flex-start gap-[10px] py-[12px] pl-[14px] pr-0 cursor-pointer items-center rounded-md ${
								selectedButton === 'Projects'
									? 'bg-winter-mint font-bold font-gilroy-bold'
									: 'font-medium font-gilroy-medium hover:bg-winter-mint'
							}`}
						>
							<img src={assets.clipboard} className='h-5 w-5'></img>
							<p className='text-sm'>Projects</p>
						</div>
					</Link>
					<Link to='/employees'>
						<div
							className={`flex flex-start gap-[10px] py-[12px] pl-[14px] pr-0 cursor-pointer items-center rounded-md ${
								selectedButton === 'Employees'
									? 'bg-winter-mint font-bold font-gilroy-bold'
									: 'font-medium font-gilroy-medium hover:bg-winter-mint'
							}`}
						>
							<img src={assets.employees} className='h-5 w-5'></img>
							<p className='text-sm'>Employees</p>
						</div>
					</Link>
					<Link to='/financial-overview'>
						<div
							className={`flex flex-start gap-[10px] py-[12px] pl-[14px] pr-0 cursor-pointer items-center rounded-md ${
								selectedButton === 'FinancialOverview'
									? 'bg-winter-mint font-bold font-gilroy-bold'
									: 'font-medium font-gilroy-medium hover:bg-winter-mint'
							}`}
						>
							<img src={assets.coins} className='h-5 w-5'></img>
							<p className='text-sm'>Financial Overview</p>
						</div>
					</Link>
					<Link to='/project-reporting'>
						<div
							className={`flex flex-start gap-[10px] py-[12px] pl-[14px] pr-0 cursor-pointer items-center rounded-md ${
								selectedButton === 'ProjectReporting'
									? 'bg-winter-mint font-bold font-gilroy-bold'
									: 'font-medium font-gilroy-medium hover:bg-winter-mint'
							}`}
						>
							<img src={assets.document} className='h-5 w-5' />
							<p className='text-sm'>Project Reporting</p>
						</div>
					</Link>
					<Link to='/invoicing'>
						<div
							className={`flex flex-start gap-[10px] py-[12px] pl-[14px] pr-0 cursor-pointer items-center rounded-md ${
								selectedButton === 'Invoicing'
									? 'bg-winter-mint font-bold font-gilroy-bold'
									: 'font-medium font-gilroy-medium hover:bg-winter-mint'
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
	);
};

export default Layout;
