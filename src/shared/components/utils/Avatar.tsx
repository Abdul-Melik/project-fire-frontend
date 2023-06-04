import { useState } from 'react';
import { avatar } from 'src/assets/media';

import HoverTooltip from 'src/shared/components/utils/HoverTooltip';

type Props = {
	className?: string;
	src?: string;
	alt: string;
	names?: {
		firstName: string;
		lastName: string;
	}[];
};

const Avatar = ({ className, src, alt, names }: Props) => {
	const [showNames, setShowNames] = useState(false);

	return (
		<div
			className='relative hover:cursor-pointer'
			onMouseEnter={() => setShowNames(true)}
			onMouseLeave={() => setShowNames(false)}
		>
			<img
				className={`h-[35px] w-[35px] rounded-full border-2 border-white object-cover ${className}`}
				src={src ? src : avatar}
				alt={alt}
			/>
			{showNames && <HoverTooltip names={names} />}
		</div>
	);
};

export default Avatar;
