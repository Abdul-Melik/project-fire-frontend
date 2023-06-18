import { useState } from 'react';

import { chevronDown } from 'assets/media';

type Props = {
	perPage: number;
	handlePerPage: (perPage: number) => void;
};

const PerPageSelector = ({ perPage, handlePerPage }: Props) => {
	const [isPerPageMenuOpen, setIsPerPageMenuOpen] = useState(false);

	return (
		<div
			className='relative flex h-8 w-[54px] cursor-pointer items-center justify-center gap-2 rounded-md border border-misty-moonstone text-center'
			onClick={() => setIsPerPageMenuOpen(!isPerPageMenuOpen)}
		>
			{isPerPageMenuOpen && (
				<div className='absolute bottom-[31px] left-0 flex w-[54px] flex-col overflow-hidden rounded-md border border-b-0 border-misty-moonstone bg-white'>
					{(() => {
						const arr = [];
						for (let i = 1; i <= 10; i++) {
							arr.push(
								<div
									className='py-1 font-opensans-semi-bold text-sm font-semibold text-midnight-steel hover:bg-misty-moonstone'
									onClick={() => handlePerPage(i)}
								>
									{i}
								</div>
							);
						}
						return arr;
					})()}
				</div>
			)}
			<span className='font-opensans-semi-bold text-sm font-semibold text-midnight-steel'>{perPage}</span>
			<img className={`transition ${isPerPageMenuOpen ? 'rotate-180' : ''}`} src={chevronDown} alt='Down icon' />
		</div>
	);
};

export default PerPageSelector;
