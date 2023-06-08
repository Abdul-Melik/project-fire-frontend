import Avatar from 'src/components/shared/utils/Avatar';

type Props = {
	images?: (string | undefined)[];
	names?: {
		firstName: string;
		lastName: string;
	}[];
};

const Avatars = ({ images = [], names = [] }: Props) => {
	const maxVisibleAvatars = 3;
	const overflowCount = Math.max(0, images.length - maxVisibleAvatars);

	return (
		<div className='relative flex flex-wrap -space-x-3'>
			{images.slice(0, maxVisibleAvatars).map((image, index) => (
				<Avatar key={index} src={image} alt='Employee icon' names={names} />
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
