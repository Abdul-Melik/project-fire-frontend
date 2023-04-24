import { useEffect } from 'react';

const Home = () => {
	useEffect(() => {
		const opt1 = document.getElementById('opt-1')!;
		const opt2 = document.getElementById('opt-2')!;
		const opt3 = document.getElementById('opt-3')!;
		const contentHeading = document.getElementById('content-heading')!;

		opt1.addEventListener('click', () => {
			contentHeading.textContent = '2023 Performance TEST';
		});

		opt2.addEventListener('click', () => {
			contentHeading.textContent = 'Development Revenue & Costs TEST';
		});

		opt3.addEventListener('click', () => {
			contentHeading.textContent = '2023 Plan TEST';
		});
	}, []);

	return (
		<div className='page-content ml-4 mr-4 flex-1 p-4'>
			<div className='flex-1 p-8 py-4 text-2xl font-bold'>Home</div>
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
									2023 Performance
								</label>
							</div>
							<div className='relative'>
								<input type='radio' name='nav' id='opt-2' className='sr-only' defaultChecked />
								<label
									htmlFor='opt-2'
									className='cursor-pointer border-y border-[#B3DFC9] px-4 py-2 text-sm font-semibold text-[#43A57C] transition-colors duration-200 ease-in-out hover:bg-[#F5FFFA] focus:bg-[#F5FFFA]'
								>
									Development Revenue &amp; Costs
								</label>
							</div>
							<div className='relative'>
								<input type='radio' name='nav' id='opt-3' className='sr-only' />
								<label
									htmlFor='opt-3'
									className='cursor-pointer rounded-r border border-[#B3DFC9] px-4 py-2 text-sm font-semibold text-[#43A57C] transition-colors duration-200 ease-in-out hover:bg-[#F5FFFA] focus:bg-[#F5FFFA]'
								>
									2023 Plan
								</label>
							</div>
						</div>
						<div className='mr-5 flex items-center'>
							<label htmlFor='years' className='mr-4 font-medium'>
								Year:
							</label>
							<select name='years' id='years' className='rounded-md border border-gray-400 px-4 py-2 font-medium'>
								<option value='2023'>2023</option>
								<option value='2022'>2022</option>
								<option value='2021'>2021</option>
								<option value='2020'>2020</option>
							</select>
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

export default Home;
