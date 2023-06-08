import { motion } from 'framer-motion';
import { useState } from 'react';

import UserMenuItem from 'src/shared/components/menus/user-menu/UserMenuItem';

type Props = {
	className: string;
	onClick: () => void;
};

const UserMenu = ({ className, onClick }: Props) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const isMobile = windowWidth <= 768;
	return (
		<motion.div
			className={`absolute flex flex-col items-center ${className}`}
			initial={!isMobile ? { opacity: 0, x: '80%', y: '-10%' } : { opacity: 0, x: '-10%', y: '-10%' }}
			animate={{ opacity: 1, y: '0' }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
		>
			<UserMenuItem label='Account Settings' />
			<UserMenuItem label='Edit profile' />
			<UserMenuItem label='Logout' onClick={onClick} />
		</motion.div>
	);
};

export default UserMenu;
