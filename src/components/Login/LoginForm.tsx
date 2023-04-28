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
		<div className='text-center px-[135px] py-72 min-[1000px]:pt-[303px] min-[1000px]:pb-[334px]'>
			<div
				className='w-[280px] h-[32.25px] absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-[1000px]:hidden'
				style={{
					backgroundImage: `url(${logo})`,
				}}
			/>
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
					className='py-3 pl-3 mt-[13px] rounded-md w-full bg-deep-teal font-semibold font-gilroy-semi-bold text-white'
					type='submit'
				>
					Log In
				</button>
			</form>
			<div className='flex flex-col items-center gap-3 min-[1188px]:justify-between min-[1188px]:flex-row'>
				<div className='flex items-center justify-start gap-[9px]'>
					<input
						className=' accent-deep-teal w-[18px] h-[18px]'
						type='checkbox'
						onChange={() => setRememberMe(!rememberMe)}
					/>
					<span className='text-midnight-grey font-medium font-gilroy-medium tracking-[-0.015em] whitespace-nowrap'>
						Remember password
					</span>
				</div>
				<a
					className='font-medium font-gilroy-medium text-deep-teal underline tracking-[-0.015em] whitespace-nowrap'
					href='#'
				>
					Forgot Password?
				</a>
			</div>
		</div>
	);
};

export default LoginForm;
