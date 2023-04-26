import { useState } from 'react';
import LoginForm from '../components/Login/LoginForm';
import LogoBanner from '../components/Login/LogoBanner';
import Modal from '../shared/components/Modal';

type Props = {};

const Login = (props: Props) => {
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<Modal onCancel={() => setError(null)} header='Login error!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			<div className='flex'>
				<div className='hidden md:block md:w-1/2'>
					<LogoBanner />
				</div>
				<div className='mx-4 w-full flex-col items-center justify-center p-4 md:w-1/2'>
					<LoginForm handleError={error => setError(error)} />
				</div>
			</div>
		</>
	);
};

export default Login;
