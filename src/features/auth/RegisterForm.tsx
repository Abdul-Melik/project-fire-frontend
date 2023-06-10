import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { gradientBackground } from 'assets/media';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setCredentials } from 'store/slices/authSlice';
import { useRegisterMutation } from 'store/slices/usersApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import InputField from 'components/form-elements/InputField';
import ImageUpload from 'components/form-elements/ImageUpload';

const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const { userInfo } = useAppSelector(state => state.auth);
	const [register, { isLoading }] = useRegisterMutation();

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('password', password);
		if (selectedImage) formData.append('image', selectedImage);
		try {
			const response = await register(formData).unwrap();
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
		<div className='flex h-full flex-col items-center justify-center'>
			{windowWidth < 1024 && (
				<div className='fixed inset-0 z-[-1]'>
					<img src={gradientBackground} alt='Background' className='h-full w-full object-cover' />
				</div>
			)}
			<div className='w-[450px] text-center'>
				<h1 className='mb-6 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey'>Register</h1>
				<form className='mb-6 flex flex-col text-base' onSubmit={handleFormSubmit}>
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
						className='mb-[21px]'
						label='First name'
						htmlFor='first-name'
						required
						type='text'
						id='first-name'
						value={firstName}
						placeholder='Enter your first name'
						handleInput={firstName => setFirstName(firstName)}
					/>
					<InputField
						className='mb-[21px]'
						label='Last name'
						htmlFor='last-name'
						required
						type='text'
						id='last-name'
						value={lastName}
						placeholder='Enter your last name'
						handleInput={lastName => setLastName(lastName)}
					/>
					<InputField
						className='mb-[21px]'
						label='Password'
						htmlFor='password'
						required
						type='password'
						id='password'
						value={password}
						placeholder='Enter your password'
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