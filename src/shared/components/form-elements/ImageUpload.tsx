type Props = {
	label: string;
	onChange: (image: File) => void;
};

const ImageUpload = ({ label, onChange }: Props) => {
	return (
		<label
			className='rounded-md bg-golden-tangerine px-4 py-2 text-midnight-grey hover:cursor-pointer hover:saturate-150'
			htmlFor='image-upload'
		>
			<span className='font-gilroy-semi-bold font-semibold'>{label}</span>
			<input
				className='hidden'
				type='file'
				id='image-upload'
				accept='image/*'
				onChange={event => {
					const selectedFile = event.target.files && event.target.files[0];
					if (selectedFile) {
						onChange(selectedFile);
					}
				}}
			/>
		</label>
	);
};

export default ImageUpload;
