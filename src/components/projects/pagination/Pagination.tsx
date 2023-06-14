import ProjectsPerPageSelector from 'src/components/projects/pagination/ProjectsPerPageSelector';
import PageNumberButton from 'src/components/projects/pagination/PageNumberButton';
import dots from 'src/assets/media/svg/dots.svg';
type Props = {
	totalNumberOfProjects: number;
	currentPage: number;
	lastPage: number;
	projectsPerPage: number;
	handleProjectsPerPage: (projectsPerPage: number) => void;
	handlePageChange: (pageNumber: number) => void;
};

const Pagination = ({
	totalNumberOfProjects,
	currentPage,
	lastPage,
	projectsPerPage,
	handleProjectsPerPage,
	handlePageChange,
}: Props) => {
	const pageNumbers = Array.from({ length: lastPage }, (_, index) => index + 1);

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-7'>
				<div className='flex items-center gap-[9px]'>
					<span className='font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-nightfall-navy'>
						Rows per page:
					</span>
					<ProjectsPerPageSelector projectsPerPage={projectsPerPage} handleProjectsPerPage={handleProjectsPerPage} />
				</div>
				<span className='font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-whispering-gray'>
					{totalNumberOfProjects === 0 ? 0 : (currentPage - 1) * projectsPerPage + 1}
					{' - '}
					{currentPage * projectsPerPage < totalNumberOfProjects
						? currentPage * projectsPerPage
						: totalNumberOfProjects}
					{' of '}
					{totalNumberOfProjects}
				</span>
			</div>
			<div className='flex items-center gap-2'>
				{currentPage > 1 && (
					<PageNumberButton key='prev' pageNumber='Previous' onClick={() => handlePageChange(currentPage - 1)} />
				)}
				{currentPage > 2 && (
					<>
						<PageNumberButton key='first' pageNumber='1' onClick={() => handlePageChange(1)} />
						<img src={dots} className='h-4 w-4' />
					</>
				)}
				{pageNumbers
					.filter(pageNumber => {
						let firstPage = currentPage - 1;
						let lastPage = currentPage + 1;
						currentPage === 1 ? lastPage++ : null;
						currentPage === pageNumbers.length ? firstPage-- : null;
						return pageNumber >= firstPage && pageNumber <= lastPage;
					})
					.map(pageNumber => {
						return (
							<PageNumberButton
								key={pageNumber}
								pageNumber={pageNumber}
								isActive={currentPage === pageNumber}
								onClick={() => handlePageChange(pageNumber)}
							/>
						);
					})}
				{currentPage < lastPage && (
					<>
						{currentPage < lastPage - 1 ? (
							<>
								<img src={dots} className='h-4 w-4' />{' '}
								<PageNumberButton key='next' pageNumber={lastPage} onClick={() => handlePageChange(lastPage)} />
							</>
						) : null}
						{pageNumbers.length > 2 && (
							<PageNumberButton key='last' pageNumber='Next' onClick={() => handlePageChange(currentPage + 1)} />
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Pagination;
