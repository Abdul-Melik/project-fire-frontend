import { useState } from 'react';
import { avatar } from 'src/assets';

import HoverTooltip from 'src/shared/components/utils/HoverTooltip';

type Props = {
	src: string;
	alt: string;
	employeeNames?: {
		firstName: string;
		lastName: string;
	}[];
	className?: string;
};

const Avatar = ({ src, alt, employeeNames, className }: Props) => {
	const [showEmployeeNames, setShowEmployeeNames] = useState(false);

	return (
		<div
			className='relative hover:cursor-pointer'
			onMouseEnter={() => setShowEmployeeNames(true)}
			onMouseLeave={() => setShowEmployeeNames(false)}
		>
			<img
				className={`h-[35px] w-[35px] rounded-full border-2 border-white object-cover ${className}`}
				src={src ? src : avatar}
				alt={alt}
			/>
			{showEmployeeNames && <HoverTooltip employeeNames={employeeNames} />}
		</div>
	);
};

export default Avatar;
