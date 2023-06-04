import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { logo } from 'src/assets/media';
import AuthContext from 'src/shared/context/auth-context';
import UserCard from 'src/shared/components/cards/UserCard';
import SidebarMenu from 'src/shared/components/menus/sidebar-menu/SidebarMenu';
import UserMenu from 'src/shared/components/menus/user-menu/UserMenu';

type HamburgerMenuProps = {
	activeMenuItem: string;
};

const HamburgerMenu = ({ activeMenuItem }: HamburgerMenuProps) => {
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
		<div className='fixed left-0 top-0 z-10 w-full bg-frost-white md:hidden'>
			<div className='flex items-center justify-between px-4 py-2'>
				<div>
					<motion.button
						className='text-3xl text-deep-forest'
						onClick={handleHamburgerMenuToggle}
						animate={{ rotate: isMenuOpen ? 90 : 0 }}
					>
						{isMenuOpen ? '✕' : '☰'}
					</motion.button>
				</div>
				<div>
					<img src={logo} className='mx-auto w-2/3 py-[30px] pl-7 pr-0' />
				</div>
				<div></div>
			</div>
			{isHamburgerMenuOpen && (
				<div className='h-screen border-b border-ashen-grey bg-gradient-to-b from-frost-white to-seafoam-green px-4 py-2'>
					<UserCard
						className='mx-[14px] my-[10px] rounded-md border border-ashen-grey'
						userInfo={user}
						isUserMenuOpen={isUserMenuOpen}
						onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
					/>
					{isUserMenuOpen && (
						<div className='relative'>
							<UserMenu
								className='right-0 top-0 w-[15vw] overflow-hidden rounded-md border border-ashen-grey bg-seafoam-green shadow-[3px_3px_3px_rgba(0,0,0,0.3)]'
								onClick={() => {
									logout();
									navigate('/login');
								}}
							/>
						</div>
					)}
					<div>
						<SidebarMenu activeMenuItem={activeMenuItem} isHamburgerMenu={true} /> {/* Dodajemo prop isHamburgerMenu */}
					</div>
				</div>
			)}
		</div>
	);
};

export default HamburgerMenu;
