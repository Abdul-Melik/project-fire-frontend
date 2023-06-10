import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { useAppDispatch } from 'store/hooks';
import { clearCredentials } from 'store/slices/authSlice';
import { useLogoutMutation } from 'store/slices/usersApiSlice';
import UserMenuItem from 'components/menus/UserMenuItem';

type Props = {
	className: string;
};

const UserMenu = ({ className }: Props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logout({}).unwrap();
			dispatch(clearCredentials());
			navigate('/login');
		} catch (err: any) {
			toast.error(err.data.error);
		}
	};

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