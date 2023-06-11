import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useLogoutMutation } from 'store/slices/authApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import UserMenuItem from 'components/menus/UserMenuItem';

type Props = {
	className: string;
};

const UserMenu = ({ className }: Props) => {
	const navigate = useNavigate();

	const [logout, { isLoading, isSuccess }] = useLogoutMutation();

	const logoutHandler = async () => {
		await logout({});
		if (isSuccess) navigate('/login');
	};

	if (isLoading) return <LoadingSpinner />;

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
			<UserMenuItem label='Logout' onClick={logoutHandler} />
		</motion.div>
	);
};

export default UserMenu;
