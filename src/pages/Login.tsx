import { useState } from 'react';

import Modal from '../shared/components/utils/Modal';
import LoginForm from '../components/login/LoginForm';
import LogoBanner from '../components/login/LogoBanner';

const Login = () => {
	const [error, setError] = useState<string | null>(null);

	return (
		<>
			<Modal onCancel={() => setError(null)} header='Login error!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			<div className='flex min-w-[1280px]'>
				<div className='flex-1'>
					<LogoBanner />
				</div>
				<div className='flex-1'>
					<LoginForm handleError={error => setError(error)} />
				</div>
			</div>
		</>
	);
};

export default Login;
