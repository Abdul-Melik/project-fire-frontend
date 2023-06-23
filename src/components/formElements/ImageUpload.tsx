import { plus } from 'assets/media';

type Props = {
	containerClassName?: string;
	labelClassName?: string;
	label: string;
	image: File | undefined;
	onChange: (image: File) => void;
};

const ImageUpload = ({ containerClassName, labelClassName, label, image, onChange }: Props) => {
	return (
		<div className={`flex flex-col ${containerClassName}`}>
			<span className='self-start font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey'>
				{label}
			</span>
			<label
				className={`flex cursor-pointer flex-col items-center justify-center gap-[10px] overflow-hidden rounded-md border border-dashed ${labelClassName}`}
				htmlFor='profileImage'
			>
				{!image ? (
					<>
						<img className='h-[14px] w-[14px]' src={plus} alt='Upload icon' />
						<span className='font-gilroy-regular text-sm font-normal leading-6 text-evergreen'>Upload</span>
					</>
				) : (
					<img className='h-full w-full object-cover' src={URL.createObjectURL(image)} alt='Profile image' />
				)}
				<input
					className='hidden'
					type='file'
					accept='image/*'
					id='profileImage'
					name='profileImage'
					onChange={event => {
						const file = event.target.files?.[0];
						if (file) {
							onChange(file);
						}
					}}
				/>
			</label>
		</div>
	);
};

export default ImageUpload;
