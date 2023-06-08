import { avatar, arrow } from 'src/assets/media';

type Role = 'Admin' | 'Guest';

type UserInfo = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string | null;
	role: Role;
};

type Props = {
	className: string;
	userInfo: UserInfo | null;
	isUserMenuOpen: boolean;
	onClick: () => void;
};

const UserCard = ({ className, userInfo, isUserMenuOpen, onClick }: Props) => {
	return (
		<div className={`flex items-center justify-between gap-[13px] px-[14px] py-[10px] ${className}`}>
			<div className='flex flex-wrap items-center gap-[13px]'>
				<img className='h-[54px] w-[54px] rounded-lg object-cover' src={userInfo?.image ? userInfo.image : avatar} />
				<div className='flex flex-col gap-[3px]'>
					<div className='flex flex-wrap gap-[3px]'>
						<span className='whitespace-nowrap font-inter-medium text-base font-medium text-steel-blue'>
							{userInfo?.firstName}
						</span>
						<span className='whitespace-nowrap font-inter-medium text-base font-medium text-steel-blue'>
							{userInfo?.lastName}
						</span>
					</div>
					<span className='font-inter-regular text-[14px] font-normal leading-[18px] text-charcoal-grey'>
						{userInfo?.role}
					</span>
				</div>
			</div>
			<img
				src={arrow}
				className={`cursor-pointer transition ${isUserMenuOpen ? 'rotate-180' : ''}`}
				onClick={onClick}
			/>
		</div>
	);
};

export default UserCard;
