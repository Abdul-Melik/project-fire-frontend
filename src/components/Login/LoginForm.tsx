import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../../shared/context/auth-context';
import FormInput from '../../shared/components/form/FormInput';
import { logo } from '../../assets';

const LoginForm = () => {
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
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='text-center px-[135px] pt-[303px] pb-[334px]'>
			<h2 className='text-[32px] text-midnight-grey leading-10 font-semibold font-gilroy-semi-bold mb-[42px]'>
				Log in
			</h2>
			<form className='flex flex-col items-center justify-center mb-[17px] text-base' onSubmit={handleFormSubmit}>
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
					className='py-3 pl-3 mt-[13px] rounded-md w-full bg-deep-teal font-semibold font-gilroy-semi-bold text-white hover:saturate-200'
					type='submit'
				>
					Log In
				</button>
			</form>
			<div className='flex items-center gap-3 justify-between'>
				<div className='flex items-center justify-start gap-[9px]'>
					<input
						className=' accent-deep-teal w-[18px] h-[18px]'
						type='checkbox'
						onChange={() => setRememberMe(!rememberMe)}
					/>
					<span className='text-midnight-grey font-medium font-gilroy-medium tracking-[-0.015em]'>
						Remember password
					</span>
				</div>
				<a className='font-medium font-gilroy-medium text-deep-teal underline tracking-[-0.015em]' href='#'>
					Forgot Password?
				</a>
			</div>
		</div>
	);
};

export default LoginForm;
