import { avatar } from 'assets/media';

type Props = {
	image: string;
	firstName: string;
	lastName: string;
	department: string;
};

const EmployeeCard = ({ image, firstName, lastName, department }: Props) => {
	return (
		<div className='flex gap-4 rounded-lg bg-white p-6'>
			<img
				className='h-20 w-20 rounded-[4.61538px] object-cover opacity-80'
				src={image ? image : avatar}
				alt='Employee image'
			/>
			<div className='flex flex-1 flex-col justify-center'>
				<span className='font-gilroy-bold text-[21px] font-bold leading-6 text-midnight-grey'>
					{firstName} {lastName}
				</span>
				<span className='font-gilroy-regular text-base font-normal text-slate-mist'>{department}</span>
			</div>
		</div>
	);
};

export default EmployeeCard;
