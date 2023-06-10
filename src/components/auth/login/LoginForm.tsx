import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, gradientBackground } from 'src/assets/media';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { setCredentials } from 'src/redux/authSlice';
import { useLoginMutation } from 'src/redux/usersApiSlice';
import LoadingSpinner from 'src/components/shared/utils/LoadingSpinner';
import InputField from 'src/components/shared/form-elements/InputField';

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const { userInfo } = useAppSelector(state => state.auth);
	const [login, { isLoading }] = useLoginMutation();

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await login({ email, password, rememberMe }).unwrap();
			dispatch(setCredentials(response));
			navigate('/home');
		} catch (error) {}
	};

	useEffect(() => {
		if (userInfo) navigate('/home');
	}, [navigate, userInfo]);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			{windowWidth < 1024 && (
				<div className='fixed inset-0 z-[-1]'>
					<img src={gradientBackground} alt='Background' className='h-full w-full object-cover' />
				</div>
			)}
			{windowWidth < 1024 && (
				<div className='h-20'>
					<img src={logo} alt='Logo' className='mx-auto mb-3 h-[150px] w-[300px] pb-20' />
				</div>
			)}
			<div className='w-[450px] text-center'>
				<h1 className='mb-[42px] font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>
					Log in
				</h1>
				<form className='mb-4 flex flex-col items-center justify-center text-base' onSubmit={handleFormSubmit}>
					<InputField
						className='mb-[21px]'
						label='Email'
						htmlFor='email'
						required
						type='email'
						id='email'
						value={email}
						placeholder='Enter your email'
						handleInput={email => setEmail(email)}
					/>
					<InputField
						className='mb-[34px]'
						label='Password'
						htmlFor='password'
						required
						type='password'
						id='password'
						value={password}
						placeholder='Enter your password'
						handleInput={password => setPassword(password)}
					/>
					<button
						className='w-full rounded-md bg-deep-teal px-[10px] py-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]'
						type='submit'
					>
						Log In
					</button>
				</form>
				<div className='mb-8 flex items-center justify-between gap-3'>
					<div className='flex items-center justify-start gap-[9px]'>
						<input
							className=' h-[18px] w-[18px] accent-deep-teal'
							type='checkbox'
							onChange={() => setRememberMe(!rememberMe)}
						/>
						<span className='font-gilroy-medium font-medium tracking-[-0.015em] text-midnight-grey'>
							Remember password
						</span>
					</div>
					<Link
						className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal underline'
						to='/forgot-password'
					>
						Forgot Password?
					</Link>
				</div>
				<div className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal'>
					Don't have an account?{' '}
					<Link to='/register'>
						<span className='font-gilroy-bold font-bold hover:cursor-pointer hover:underline'>Sign up.</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
