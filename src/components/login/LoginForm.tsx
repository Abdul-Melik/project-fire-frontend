import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from 'src/shared/context/auth-context';
import Modal from 'src/shared/components/utils/Modal';
import InputField from 'src/shared/components/form-elements/InputField';

type Props = {
	handleError: (error: string | null) => void;
};

const LoginForm = ({ handleError }: Props) => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const handleFormSubmit = async (event: React.FormEvent) => {
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
			if (axios.isAxiosError(error)) {
				handleError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
	};

	return (
		<>
			<Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			<div className='px-[135px] pb-[334px] pt-[303px] text-center'>
				<h2 className='mb-[42px] font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>
					Log in
				</h2>
				<form className='mb-[17px] flex flex-col items-center justify-center text-base' onSubmit={handleFormSubmit}>
					<InputField
						label='Email'
						htmlFor='email'
						type='email'
						id='email'
						placeholder='Enter your email'
						value={email}
						required={true}
						handleInput={email => setEmail(email)}
					/>
					<InputField
						label='Password'
						htmlFor='password'
						type='password'
						id='password'
						placeholder='Enter your password'
						value={password}
						required={true}
						handleInput={password => setPassword(password)}
					/>
					<button
						className='mt-[13px] w-full rounded-md bg-deep-teal py-3 pl-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]'
						type='submit'
					>
						Log In
					</button>
				</form>
				<div className='flex items-center justify-between gap-3'>
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
			</div>
		</>
	);
};

export default LoginForm;
