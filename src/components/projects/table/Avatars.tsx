import Avatar from 'src/shared/components/utils/Avatar';

type Props = {
	images?: string[];
	employeeNames?: {
		firstName: string;
		lastName: string;
	}[];
};

const Avatars = ({ images = [], employeeNames = [] }: Props) => {
	const maxVisibleAvatars = 3;
	const overflowCount = Math.max(0, images.length - maxVisibleAvatars);

	return (
		<div className='relative flex flex-wrap -space-x-3'>
			{images.slice(0, maxVisibleAvatars).map((image, index) => (
				<Avatar src={image} key={index} alt='Employee icon' employeeNames={employeeNames} />
			))}
			{overflowCount > 0 && (
				<div className=''>
					<div className='absolute flex h-[35px] w-[35px] items-center justify-center rounded-full bg-deep-teal font-gilroy-semi-bold text-sm font-semibold leading-[22px] text-white'>
						{overflowCount}+
					</div>
				</div>
			)}
		</div>
	);
};

export default Avatars;
