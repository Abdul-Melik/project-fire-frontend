import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { gradientBackground } from 'assets/media';
import { useRegisterMutation } from 'store/slices/authApiSlice';
import LoadingSpinner from 'components/utils/LoadingSpinner';
import InputField from 'src/components/formElements/InputField';
import ImageUpload from 'src/components/formElements/ImageUpload';

const RegisterForm = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const [register, { isLoading, isSuccess }] = useRegisterMutation();

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);
		formData.append('password', password);
		if (selectedImage) formData.append('image', selectedImage);
		await register(formData);
	};

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (isSuccess) navigate('/home');
	}, [isSuccess]);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='flex h-full flex-col items-center justify-center'>
			{windowWidth < 1024 && (
				<div className='fixed inset-0 z-[-1]'>
					<img src={gradientBackground} alt='Background image' className='h-full w-full object-cover' />
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
						name='email'
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
						name='first-name'
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
						name='last-name'
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
						name='password'
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
