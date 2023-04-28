import LoginForm from '../components/login/LoginForm';
import LogoBanner from '../components/login/LogoBanner';

const Login = () => {
	return (
		<div className='flex'>
			<div className='flex-1 hidden min-[1000px]:block'>
				<LogoBanner />
			</div>
			<div className='flex-1'>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
