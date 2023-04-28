import { logo, gradientBackground } from '../../assets';

const LogoBanner = () => {
	return (
		<div
			className='h-full bg-no-repeat bg-cover flex justify-center items-center'
			style={{
				backgroundImage: `url(${gradientBackground})`,
			}}
		>
			<div
				className='w-[280px] h-[32.25px]'
				style={{
					backgroundImage: `url(${logo})`,
				}}
			/>
		</div>
	);
};

export default LogoBanner;
