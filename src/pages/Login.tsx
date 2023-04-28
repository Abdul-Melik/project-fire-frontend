import LoginForm from '../components/login/LoginForm';
import LogoBanner from '../components/login/LogoBanner';

const Login = () => {
	return (
		<div className='flex min-w-[1280px]'>
			<div className='flex-1'>
				<LogoBanner />
			</div>
			<div className='flex-1'>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
