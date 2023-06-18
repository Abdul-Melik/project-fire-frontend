type Props = {
	handleDelete: () => void;
	handleEdit: () => void;
};

const ViewFooter = ({ handleDelete, handleEdit }: Props) => {
	return (
		<footer className='absolute bottom-0 left-0 flex w-full items-center justify-end gap-2 bg-white p-6'>
			<button
				className='rounded-md border border-crimson-blaze px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-crimson-blaze'
				onClick={handleDelete}
			>
				Delete Employee
			</button>
			<button
				className='rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white'
				onClick={handleEdit}
			>
				Edit Employee
			</button>
		</footer>
	);
};

export default ViewFooter;
