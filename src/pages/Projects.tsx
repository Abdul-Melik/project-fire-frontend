import { useEffect } from 'react';

type Props = {};

const Projects = (props: Props) => {
	useEffect(() => {
		const opt1 = document.getElementById('opt-1')!;
		const opt2 = document.getElementById('opt-2')!;
		const opt3 = document.getElementById('opt-3')!;
		const opt4 = document.getElementById('opt-4')!;
		const contentHeading = document.getElementById('content-heading')!;

		opt1.addEventListener('click', () => {
			contentHeading.textContent = 'All Projects TEST';
		});

		opt2.addEventListener('click', () => {
			contentHeading.textContent = 'Active';
		});

		opt3.addEventListener('click', () => {
			contentHeading.textContent = 'Inactive';
		});

		opt4.addEventListener('click', () => {
			contentHeading.textContent = 'Completed';
		});
	}, []);

	return (
		<div className='page-content ml-4 mr-8 flex-1 p-4'>
			<div className='content-categories flex items-center'>
				<div className='flex-1 p-8 py-4 text-2xl font-bold'>Projects</div>
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
								<input type='radio' name='nav' id='opt-1' className='sr-only' />
								<label
									htmlFor='opt-1'
									className='cursor-pointer rounded-l-md border border-[#B3DFC9] px-4 py-2 text-sm font-semibold text-[#43A57C] transition-colors duration-200 ease-in-out hover:bg-[#F5FFFA] focus:bg-[#F5FFFA]'
								>
									All projects
								</label>
							</div>
							<div className='relative'>
								<input type='radio' name='nav' id='opt-2' className='sr-only' defaultChecked />
								<label
									htmlFor='opt-2'
									className='cursor-pointer border-y border-r border-[#B3DFC9] px-4 py-2 text-sm font-semibold text-[#43A57C] transition-colors duration-200 ease-in-out hover:bg-[#F5FFFA] focus:bg-green-100'
								>
									Active
								</label>
							</div>
							<div className='relative'>
								<input type='radio' name='nav' id='opt-3' className='sr-only' />
								<label
									htmlFor='opt-3'
									className='cursor-pointer  border-y border-[#B3DFC9] px-4 py-2 text-sm font-semibold text-[#43A57C] transition-colors duration-200 ease-in-out hover:bg-[#F5FFFA] focus:bg-green-100'
								>
									Inactive
								</label>
							</div>
							<div className='relative'>
								<input type='radio' name='nav' id='opt-4' className='sr-only' />
								<label
									htmlFor='opt-4'
									className='cursor-pointer rounded-r-md border border-[#B3DFC9] px-4 py-2 text-sm font-semibold text-[#43A57C] transition-colors duration-200 ease-in-out hover:bg-[#F5FFFA] focus:bg-green-100'
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
