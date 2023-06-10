import ProjectsPerPageSelector from 'features/projects/ProjectsPerPageSelector';
import PageNumberButton from 'features/projects/PageNumberButton';

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
			<div className='flex gap-2'>
				{currentPage > 1 && (
					<>
						{pageNumbers.length > 2 && (
							<PageNumberButton key='first' pageNumber='First' onClick={() => handlePageChange(1)} />
						)}
						<PageNumberButton key='prev' pageNumber='Prev' onClick={() => handlePageChange(currentPage - 1)} />
					</>
				)}
				{pageNumbers
					.filter(pageNumber => {
						const firstPage = currentPage - 1;
						const lastPage = currentPage + 1;
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
