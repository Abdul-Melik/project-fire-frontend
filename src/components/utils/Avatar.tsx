import { avatar } from 'assets/media';

type Props = {
	className?: string;
	src?: string;
	alt: string;
	names?: {
		firstName: string;
		lastName: string;
	}[];
};

const Avatar = ({ className, src, alt }: Props) => {
	return (
		<div>
			<img
				className={`h-[35px] w-[35px] rounded-full border-2 border-white object-cover ${className}`}
				src={src ? src : avatar}
				alt={alt}
			/>
		</div>
	);
};

export default Avatar;
