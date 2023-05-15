type Props = {
	employeeNames?: {
		firstName: string;
		lastName: string;
	}[];
};

const HoverTooltip = ({ employeeNames = [] }: Props) => {
	const formattedNames = employeeNames.map(({ firstName, lastName }) => `${firstName} ${lastName}`).join(', ');

	return (
		<div className='absolute left-1/2 top-[-32px] -translate-x-1/2 transform'>
			<div className='z-0 flex items-center justify-center'>
				<div className='h-[23px] whitespace-nowrap rounded bg-black p-2 font-sans text-[11px] font-semibold text-white'>
					<div className='flex h-full items-center'>
						<p className='z-20 flex-shrink-0 flex-grow text-center'>{formattedNames}</p>
					</div>
				</div>
				<div className='absolute bottom-0 left-1/2 -translate-x-3 transform'>
					<div className='z-10 h-4 w-4 rotate-45 transform bg-black' />
				</div>
			</div>
		</div>
	);
};

export default HoverTooltip;
