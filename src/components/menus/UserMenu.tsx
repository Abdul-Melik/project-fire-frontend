import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useLogoutMutation } from 'store/slices/authApiSlice';
import UserMenuItem from 'components/menus/UserMenuItem';

type Props = {
	className: string;
};

const UserMenu = ({ className }: Props) => {
	const navigate = useNavigate();

	const [logout, { isSuccess }] = useLogoutMutation();

	const logoutHandler = async () => {
		await logout({});
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/login');
		}
	}, [isSuccess, navigate]);

	return (
		<motion.div
			className={`absolute z-10 flex flex-col items-center ${className}`}
			initial={{ opacity: 0, x: '80%', y: '-10%' }}
			animate={{ opacity: 1, y: '0' }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
		>
			<UserMenuItem label='Account Settings' className='border-b border-misty-moonstone' />
			<UserMenuItem label='Edit profile' className='border-b border-misty-moonstone' />
			<UserMenuItem label='Logout' onClick={logoutHandler} />
		</motion.div>
	);
};

export default UserMenu;
