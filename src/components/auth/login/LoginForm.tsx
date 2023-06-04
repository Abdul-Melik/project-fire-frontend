import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { logo, gradientBackground } from 'src/assets/media';
import AuthContext from 'src/shared/context/auth-context';
import InputField from 'src/shared/components/form-elements/InputField';

const LoginForm = () => {
	const { token, login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`${baseUrl}/api/users/login`,
				{
					email,
					password,
					rememberMe,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const responseData = response.data;
			login(responseData.token, responseData.expiresIn, responseData.user);
			navigate('/home');
		} catch (error: any) {
			toast.error(axios.isAxiosError(error) ? error.response?.data.error : `Unexpected error: ${error}`);
		}
	};

	useEffect(() => {
		if (token) navigate('/home');
	}, [token]);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

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
