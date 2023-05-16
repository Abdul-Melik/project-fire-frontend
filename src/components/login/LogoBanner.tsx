import { logo } from 'src/assets';

const LogoBanner = () => {
	return (
		<div className='logo-banner flex h-full w-full items-center justify-center bg-[url("src/assets/svg/gradient-background.svg")] bg-cover bg-no-repeat'>
			<div
				className='h-1/2 w-full bg-cover bg-center'
				style={{
					backgroundImage: `url(${logo})`,
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
					width: '300px',
					height: '150px',
				}}
			/>
		</div>
	);
};

export default LogoBanner;
