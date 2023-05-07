import { motion } from 'framer-motion';

import UserMenuItem from './UserMenuItem';

type Props = {
	className: string;
	onClick: () => void;
};

const UserMenu = ({ className, onClick }: Props) => {
	return (
		<motion.div
			className={`absolute flex flex-col items-center ${className}`}
			initial={{ opacity: 0, x: '80%', y: '-10%' }}
			animate={{ opacity: 1, y: '0' }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
		>
			<UserMenuItem label='Placeholder text 1' />
			<UserMenuItem label='Placeholder text 2' />
			<UserMenuItem label='Placeholder text 3' />
			<UserMenuItem label='Logout' onClick={onClick} />
		</motion.div>
	);
};

export default UserMenu;
