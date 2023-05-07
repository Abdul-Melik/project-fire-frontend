import { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import * as assets from 'src/assets';
import AuthContext from 'src/shared/context/auth-context';
import Modal from 'src/shared/components/utils/Modal';
import UserCard from 'src/shared/components/card/UserCard';
import SidebarMenu from 'src/shared/components/menu/sidebar-menu/SidebarMenu';
import UserMenu from 'src/shared/components/menu/user-menu/UserMenu';

type Props = {
	activeMenuItem: string;
	children: React.ReactNode;
};

const MainLayout = ({ activeMenuItem, children }: Props) => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<any>(null);
	const [tokenAvailability, setTokenAvailability] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const getUserInfo = useCallback(async () => {
		try {
			const responseData = await axios.get(`${baseUrl}/api/users/${auth.userId}`, {
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
		if (auth.token && auth.userId) {
			getUserInfo();
		} else if (!tokenAvailability) {
			setTokenAvailability(true);
		} else {
			navigate('/login');
		}
	}, [auth.token, auth.userId, tokenAvailability]);

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
						<UserCard
							className='mx-[14px] my-[10px] rounded-md border border-ashen-grey'
							userInfo={userInfo}
							isUserMenuOpen={isUserMenuOpen}
							onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
						/>
						<div className='relative'>
							{isUserMenuOpen && (
								<UserMenu
									className='right-0 top-0 w-[15vw] overflow-hidden rounded-md border border-ashen-grey bg-seafoam-green shadow-[3px_3px_3px_rgba(0,0,0,0.3)]'
									onClick={() => auth.logout()}
								/>
							)}
						</div>
						<SidebarMenu activeMenuItem={activeMenuItem} />
					</div>
					<div className='flex-1'>{children}</div>
				</div>
			)}
		</>
	);
};

export default MainLayout;
