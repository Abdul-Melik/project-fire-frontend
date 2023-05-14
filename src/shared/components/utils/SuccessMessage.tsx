import { Link } from 'react-router-dom';

type Props = {
	successMessage: string;
};

const SuccessMessage = ({ successMessage }: Props) => {
	return (
		<div className='font-gilroy-medium font-medium text-charcoal-grey'>
			{successMessage} Go back to{' '}
			<Link to='/login'>
				<strong className='underline'>login page.</strong>
			</Link>
		</div>
	);
};

export default SuccessMessage;
