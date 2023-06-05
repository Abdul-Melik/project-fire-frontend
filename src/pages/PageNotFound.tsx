import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { error } from 'src/assets/media';
import AuthContext from 'src/shared/context/auth-context';

const PageNotFound = () => {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);

	const handleButtonClick = () => {
		if (token) {
			navigate('/home');
		} else {
			navigate('/login');
		}
	};

	return (
		<div className='flex h-screen w-full flex-col items-center justify-start gap-10 p-16'>
			<div className='flex w-1/4 flex-col items-center'>
				<img src={error} alt='404 Error' />
			</div>
			<div className='text-center font-gilroy-semi-bold text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>
				This page cannot be found.
				<br />
				Please explore other sections of our website.
			</div>
			<button
				className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-xs font-semibold tracking-[-0.015em] text-white hover:saturate-[400%] md:px-5 md:py-2.5 md:text-sm lg:px-6 lg:py-3 lg:text-base xl:px-7 xl:py-3.5 xl:text-lg 2xl:px-8 2xl:py-4 2xl:text-xl'
				onClick={handleButtonClick}
			>
				{token ? 'Back to Home' : 'Back to Login'}
			</button>
		</div>
	);
};

export default PageNotFound;
