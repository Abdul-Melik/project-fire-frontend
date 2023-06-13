type Props = {
	columns: string[];
};

const EmployeesTableHead = ({ columns }: Props) => {
	return (
		<thead>
			<tr className='h-[40px] text-left'>
				{columns.map((column, index) => (
					<th
						key={index}
						className='w-[150px] px-4 py-2 font-gilroy-medium text-sm font-medium leading-[22px] text-slate-mist'
					>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default EmployeesTableHead;
