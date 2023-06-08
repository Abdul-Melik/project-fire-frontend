import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {
	return (
		<div className='flex h-screen items-center justify-center'>
			<ClipLoader color='#43A57C' cssOverride={{ borderWidth: '5px' }} size={100} />
		</div>
	);
};

export default LoadingSpinner;
