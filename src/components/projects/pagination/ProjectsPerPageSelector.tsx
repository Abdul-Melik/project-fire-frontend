type Props = {
	projectsPerPage: number;
	handleProjectsPerPage: (projectsPerPage: number) => void;
};

const ProjectsPerPageSelector = ({ projectsPerPage, handleProjectsPerPage }: Props) => {
	return (
		<div className='h-8 w-[54px] overflow-hidden rounded-md border border-misty-moonstone text-center'>
			<select
				className='h-full w-3/4 font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-midnight-steel outline-none'
				value={projectsPerPage}
				onChange={event => handleProjectsPerPage(Number(event.target.value))}
			>
				<option value='1'>1</option>
				<option value='2'>2</option>
				<option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>
				<option value='6'>6</option>
				<option value='7'>7</option>
				<option value='8'>8</option>
				<option value='9'>9</option>
				<option value='10'>10</option>
			</select>
		</div>
	);
};

export default ProjectsPerPageSelector;
