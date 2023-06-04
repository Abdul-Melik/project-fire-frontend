import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { logo } from 'src/assets/media';
import AuthContext from 'src/shared/context/auth-context';
import UserCard from 'src/shared/components/cards/UserCard';
import SidebarMenu from 'src/shared/components/menus/sidebar-menu/SidebarMenu';
import UserMenu from 'src/shared/components/menus/user-menu/UserMenu';
import HamburgerMenu from '../utils/HamburgerMenu';

type Props = {
	activeMenuItem: string;
	children: React.ReactNode;
};

const MainLayout = ({ activeMenuItem, children }: Props) => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);

	const handleHamburgerMenuToggle = () => {
		setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
		setMenuOpen(!isMenuOpen);
	};

	return (
		<div className='flex min-h-screen'>
			<div
				className='hidden items-center gap-[10px] border-r border-opal-mist bg-gradient-to-b from-frost-white to-seafoam-green md:block'
				style={{ minWidth: '300px' }}
			>
				<img src={logo} className='w-2/3 py-[30px] pl-7 pr-0' />
				<UserCard
					className='mx-[14px] my-[10px] rounded-md border border-ashen-grey'
					userInfo={user}
					isUserMenuOpen={isUserMenuOpen}
					onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
				/>
				<div className='relative'>
					{isUserMenuOpen && (
						<UserMenu
							className='right-0 top-0 w-[15vw] overflow-hidden rounded-md border border-ashen-grey bg-seafoam-green shadow-[3px_3px_3px_rgba(0,0,0,0.3)]'
							onClick={() => {
								logout();
								navigate('/login');
							}}
						/>
					)}
				</div>
				<div>
					<SidebarMenu activeMenuItem={activeMenuItem} />
				</div>
			</div>
			<HamburgerMenu activeMenuItem={activeMenuItem} />
			<div className='flex-1'>{children}</div>
		</div>
	);
};

export default MainLayout;
