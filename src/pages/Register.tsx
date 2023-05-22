import LogoBanner from 'src/components/auth/LogoBanner';
import RegisterForm from 'src/components/auth/register/RegisterForm';

const Register = () => {
	return (
		<>
			<div className='flex h-screen'>
				<div className='hidden lg:block lg:w-1/2'>
					<LogoBanner />
				</div>
				<div className='h-full w-full lg:w-1/2'>
					<RegisterForm />
				</div>
			</div>
		</>
	);
};

export default Register;
