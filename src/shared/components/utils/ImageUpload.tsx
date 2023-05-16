type Props = {
	label: string;
	onChange: (image: File) => void;
};

const ImageUpload = ({ label, onChange }: Props) => {
	return (
		<>
			<label className='rounded-md bg-whispering-gray px-4 py-2 text-midnight-grey hover:cursor-pointer hover:brightness-[80%]'>
				<span className='font-gilroy-medium font-medium'>{label}</span>
				<input
					className='hidden'
					type='file'
					accept='image/*'
					onChange={event => {
						const selectedFile = event.target.files && event.target.files[0];
						if (selectedFile) {
							onChange(selectedFile);
						}
					}}
				/>
			</label>
		</>
	);
};

export default ImageUpload;
