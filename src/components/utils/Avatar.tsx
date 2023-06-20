import { useState } from 'react';

import { avatar } from 'assets/media';
import HoverTooltip from 'components/utils/HoverTooltip';

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

	const formattedNames = names?.map(({ firstName, lastName }) => `${firstName} ${lastName}`).join(', ');

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
			{showNames && formattedNames && <HoverTooltip content={formattedNames} />}
		</div>
	);
};

export default Avatar;
