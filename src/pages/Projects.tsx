import { useEffect, useState } from 'react';

type Props = {};

const Projects = (props: Props) => {
	const [activeNav, setActiveNav] = useState(1);

	return (
		<div className='page-content ml-4 mr-8 flex-1 p-4'>
			<div className='content-categories flex items-center'>
				<div className='flex-1 p-8 py-4 text-3xl font-bold'>Projects</div>
				<button className='ml-auto rounded-md bg-buttonColor px-4 py-2 text-base font-semibold text-white hover:bg-green-900'>
					Create new project
				</button>
			</div>
			<div className='content-categories flex'>
				<div className='label-wrapper'></div>
				<div className='flex-1 p-8 py-2'>
					<div className='flex items-center justify-between py-4'>
						<div className='flex'>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-1'
									className='sr-only'
									checked={activeNav === 1}
									onChange={() => setActiveNav(1)}
								/>
								<label
									htmlFor='opt-1'
									className={`cursor-pointer rounded-l border border-[#B3DFC9] ${
										activeNav === 1
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									All Projects
								</label>
							</div>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-2'
									className='sr-only'
									checked={activeNav === 2}
									onChange={() => setActiveNav(2)}
								/>
								<label
									htmlFor='opt-2'
									className={`cursor-pointer border-y border-r-[1px] border-[#B3DFC9] ${
										activeNav === 2
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									Active
								</label>
							</div>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-3'
									className='sr-only'
									checked={activeNav === 3}
									onChange={() => setActiveNav(3)}
								/>
								<label
									htmlFor='opt-3'
									className={`cursor-pointer border-y border-[#B3DFC9] ${
										activeNav === 3
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									Inactive
								</label>
							</div>
							<div className='relative'>
								<input
									type='radio'
									name='nav'
									id='opt-4'
									className='sr-only'
									checked={activeNav === 4}
									onChange={() => setActiveNav(4)}
								/>
								<label
									htmlFor='opt-4'
									className={`cursor-pointer rounded-r border border-[#B3DFC9] ${
										activeNav === 4
											? 'bg-[#F5FFFA] text-[#43A57C]'
											: 'border-[#B3DFC9] text-[#43A57C] hover:bg-[#F5FFFA]'
									} px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out`}
								>
									Completed
								</label>
							</div>
						</div>
					</div>
					<div className='inline w-1/5 justify-center'>
						<h1 className='mt-6 text-2xl font-bold' id='content-heading'></h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
