import { logo, gradientBackground } from '../../assets';

const LogoBanner = () => {
	return (
		<div
			className='flex h-full items-center justify-center bg-cover bg-no-repeat'
			style={{
				backgroundImage: `url(${gradientBackground})`,
			}}
		>
			<div
				className='h-[32.25px] w-[280px]'
				style={{
					backgroundImage: `url(${logo})`,
				}}
			/>
		</div>
	);
};

export default LogoBanner;
