import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import AuthContext from '../../shared/context/auth-context';
import FormInput from '../../shared/components/form/FormInput';

type Props = {
	handleError: (error: string | null) => void;
};

const LoginForm = ({ handleError }: Props) => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:5000/api/users/login',
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
			auth.login(responseData.token, responseData.expiresIn, responseData.user.id);
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
		<div className='px-[135px] pb-[334px] pt-[303px] text-center'>
			<h2 className='mb-[42px] font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>
				Log in
			</h2>
			<form className='mb-[17px] flex flex-col items-center justify-center text-base' onSubmit={handleFormSubmit}>
				<FormInput
					label='Email'
					htmlFor='email'
					type='email'
					id='email'
					placeholder='Enter your email'
					value={email}
					required={true}
					handleInput={email => setEmail(email)}
				/>
				<FormInput
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
					className='mt-[13px] w-full rounded-md bg-deep-teal py-3 pl-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-200'
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
				<a className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal underline' href='#'>
					Forgot Password?
				</a>
			</div>
		</div>
	);
};

export default LoginForm;
