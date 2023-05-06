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
			initial={{ opacity: 0, y: '-5%' }}
			animate={{ opacity: 1, y: '0' }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
		>
			<UserMenuItem className='border-b border-ashen-grey' label='Placeholder text 1' />
			<UserMenuItem className='border-b border-ashen-grey' label='Placeholder text 2' />
			<UserMenuItem className='border-b border-ashen-grey' label='Placeholder text 3' />
			<UserMenuItem className='border-b border-ashen-grey' label='Logout' onClick={onClick} />
		</motion.div>
	);
};

export default UserMenu;
