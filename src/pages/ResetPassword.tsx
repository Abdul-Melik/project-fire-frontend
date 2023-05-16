import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Modal from 'src/shared/components/utils/Modal';
import InputField from 'src/shared/components/form-elements/InputField';
import SuccessMessage from 'src/shared/components/utils/SuccessMessage';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';

const ResetPassword = () => {
	const { userId, token } = useParams<{ userId: string; token: string }>();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${baseUrl}/api/users/${userId}/reset-password/${token}`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			setSuccessMessage(response.data.message);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.error);
			} else {
				console.error('Unexpected error: ', error);
			}
		}
		setIsLoading(false);
	};

	return (
		<>
			<Modal onCancel={() => setError(null)} header='An error occurred!' show={!!error} isError={!!error}>
				<p>{error}</p>
			</Modal>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className='flex h-screen flex-col items-center justify-center'>
					<div className='w-full max-w-3xl p-10 text-center md:w-5/6 lg:w-4/6'>
						<h2 className='mb-10 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>
							Reset Password
						</h2>
						<form className='flex flex-col items-center justify-center text-base' onSubmit={handleFormSubmit}>
							<InputField
								label='New Password'
								htmlFor='password'
								type='password'
								id='password'
								placeholder='Enter your password'
								value={password}
								required={true}
								handleInput={password => setPassword(password)}
							/>
							<InputField
								label='Confirm Password'
								htmlFor='confirm-password'
								type='password'
								id='confirm-password'
								placeholder='Confirm your password'
								value={confirmPassword}
								required={true}
								handleInput={confirmPassword => setConfirmPassword(confirmPassword)}
							/>
							<button
								className='mt-[13px] w-full rounded-md bg-deep-teal py-3 pl-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]'
								type='submit'
							>
								Reset Password
							</button>
						</form>
					</div>
					{successMessage && <SuccessMessage successMessage={successMessage} />}
				</div>
			)}
		</>
	);
};

export default ResetPassword;
