import PerPageSelector from 'components/pagination/PerPageSelector';
import PageNumberButton from 'components/pagination/PageNumberButton';

type Props = {
	total: number;
	currentPage: number;
	lastPage: number;
	perPage: number;
	items: string;
	handlePerPage: (perPage: number) => void;
	handlePageChange: (pageNumber: number) => void;
};

const Pagination = ({ total, currentPage, lastPage, perPage, items, handlePerPage, handlePageChange }: Props) => {
	const pageNumbers = Array.from({ length: lastPage }, (_, index) => index + 1);

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-7'>
				<div className='flex items-center gap-[9px]'>
					<span className='font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-nightfall-navy'>
						Rows per page:
					</span>
					<PerPageSelector perPage={perPage} handlePerPage={handlePerPage} />
				</div>
				<span className='font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-whispering-gray'>
					{total === 0 ? 0 : currentPage > total ? total : (currentPage - 1) * perPage + 1}
					{' - '}
					{currentPage * perPage < total ? currentPage * perPage : total}
					{' of '}
					{total} {items}
				</span>
			</div>
			<div className='flex gap-2'>
				{currentPage > 1 && (
					<>
						{pageNumbers.length > 2 && (
							<PageNumberButton key='first' pageNumber='First' onClick={() => handlePageChange(1)} />
						)}
						{currentPage <= total && (
							<PageNumberButton key='prev' pageNumber='Prev' onClick={() => handlePageChange(currentPage - 1)} />
						)}
					</>
				)}
				{pageNumbers
					.filter(pageNumber => {
						if (currentPage <= total) {
							const firstPage = currentPage - 1;
							const lastPage = currentPage + 1;
							return pageNumber >= firstPage && pageNumber <= lastPage;
						}
						return true;
					})
					.map(pageNumber => (
						<PageNumberButton
							key={pageNumber}
							pageNumber={pageNumber}
							isActive={currentPage === pageNumber}
							onClick={() => handlePageChange(pageNumber)}
						/>
					))}
				{currentPage < lastPage && (
					<>
						<PageNumberButton key='next' pageNumber='Next' onClick={() => handlePageChange(currentPage + 1)} />
						{pageNumbers.length > 2 && (
							<PageNumberButton key='last' pageNumber='Last' onClick={() => handlePageChange(lastPage)} />
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Pagination;
