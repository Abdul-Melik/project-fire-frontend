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
		<div className='flex'>
			<div className='h-screen w-72 flex-col items-center border-r border-opal-mist bg-gradient-to-b from-frost-white to-seafoam-green'>
				<img src={assets.logo} className='ml-6 w-3/5 pt-8' />
				<div className='border-ashen-grey mx-auto mt-10 flex h-20 w-11/12 items-center rounded-md border'>
					<img
						className='ml-3 h-14 w-14 rounded-lg object-cover'
						src={userInfo.image ? userInfo.image : assets.avatar}
					/>
					<div className='flex-col'>
						<p className='mb-0 ml-4 font-inter-medium font-medium'>{`${userInfo.firstName} ${userInfo.lastName}`}</p>
						<p className='font-normal font-inter-regular ml-4 text-sm'>
							{userInfo.role === 'admin' ? 'Admin' : 'Employee'}
						</p>
					</div>
					<img src={assets.arrow} className='absolute ml-56 cursor-pointer pl-2' />
				</div>
				<Link to='/home'>
					<div
						className={`mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md ${
							selectedButton === 'Home'
								? 'bg-winter-mint font-bold font-gilroy-bold'
								: 'font-medium font-gilroy-medium hover:bg-winter-mint'
						}`}
					>
						<img src={assets.home} className='ml-3 h-5 w-5' />
						<p className='ml-3 text-sm'>Home</p>
					</div>
				</Link>
				<Link to='/projects'>
					<div
						className={`mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md ${
							selectedButton === 'Projects'
								? 'bg-winter-mint font-bold font-gilroy-bold'
								: 'font-medium font-gilroy-medium hover:bg-winter-mint'
						}`}
					>
						<img src={assets.clipboard} className='ml-3 h-5 w-5'></img>
						<p className='ml-3 text-sm'>Projects</p>
					</div>
				</Link>
				<Link to='/employees'>
					<div
						className={`mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md ${
							selectedButton === 'Employees'
								? 'bg-winter-mint font-bold font-gilroy-bold'
								: 'font-medium font-gilroy-medium hover:bg-winter-mint'
						}`}
					>
						<img src={assets.employees} className='ml-3 h-5 w-5'></img>
						<p className='ml-3 text-sm'>Employees</p>
					</div>
				</Link>
				<Link to='/financial-overview'>
					<div
						className={`mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md ${
							selectedButton === 'FinancialOverview'
								? 'bg-winter-mint font-bold font-gilroy-bold'
								: 'font-medium font-gilroy-medium hover:bg-winter-mint'
						}`}
					>
						<img src={assets.coins} className='ml-3 h-5 w-5'></img>
						<p className='ml-3 text-sm'>Financial Overview</p>
					</div>
				</Link>
				<Link to='/project-reporting'>
					<div
						className={`mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md ${
							selectedButton === 'ProjectReporting'
								? 'bg-winter-mint font-bold font-gilroy-bold'
								: 'font-medium font-gilroy-medium hover:bg-winter-mint'
						}`}
					>
						<img src={assets.document} className='ml-3 h-5 w-5' />
						<p className='ml-3 text-sm'>Project Reporting</p>
					</div>
				</Link>
				<Link to='/invoicing'>
					<div
						className={`mx-auto mt-3 flex h-12 w-11/12 cursor-pointer items-center rounded-md ${
							selectedButton === 'Invoicing'
								? 'bg-winter-mint font-bold font-gilroy-bold'
								: 'font-medium font-gilroy-medium hover:bg-winter-mint'
						}`}
					>
						<img src={assets.invoice} className='ml-3 h-5 w-5' />
						<p className='ml-3 text-sm'>Invoicing</p>
					</div>
				</Link>
			</div>
			<div className='flex-1'>{children}</div>
		</div>
	);
};

export default Layout;
