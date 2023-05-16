import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { gradientBackground } from 'src/assets';
import AuthContext from 'src/shared/context/auth-context';
import InputField from 'src/shared/components/form-elements/InputField';
import ImageUpload from 'src/shared/components/utils/ImageUpload';

type Props = {
	handleError: (error: string | null) => void;
};

const RegisterForm = ({ handleError }: Props) => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const baseUrl = import.meta.env.VITE_BASE_URL;

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData();
		if (selectedImage) formData.append('image', selectedImage);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		try {
			const response = await axios.post(`${baseUrl}/api/users/register`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
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
		setSelectedImage(null);
	};

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='flex h-full flex-col items-center justify-center'>
			{windowWidth < 1024 && (
				<div className='fixed inset-0 z-[-1]'>
					<img src={gradientBackground} alt='Background' className='h-full w-full object-cover' />
				</div>
			)}
			<div className='w-[450px] text-center'>
				<h2 className='mb-6 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>Register</h2>
				<form className='mb-6 flex flex-col text-base' onSubmit={handleFormSubmit}>
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
						label='First name'
						htmlFor='First name'
						type='text'
						id='firstName'
						placeholder='Enter your first name'
						value={firstName}
						required={true}
						handleInput={firstName => setFirstName(firstName)}
					/>
					<InputField
						label='Last name'
						htmlFor='Last name'
						type='text'
						id='lastName'
						placeholder='Enter your last name'
						value={lastName}
						required={true}
						handleInput={lastName => setLastName(lastName)}
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
					<div className='flex items-center justify-start gap-4'>
						<ImageUpload
							label={selectedImage ? 'Image uploaded' : 'Choose an image'}
							onChange={image => setSelectedImage(image)}
						/>
						<button
							className='flex-1 rounded-md bg-deep-teal px-4 py-2 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]'
							type='submit'
						>
							Register
						</button>
					</div>
				</form>
				<div className='font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal'>
					Changed your mind?{' '}
					<Link to='/login'>
						<span className='font-gilroy-bold font-bold hover:cursor-pointer hover:underline'>Go back.</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
