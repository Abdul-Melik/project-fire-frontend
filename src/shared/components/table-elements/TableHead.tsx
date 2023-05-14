type Props = {
	columns: string[];
};

const TableHead = ({ columns }: Props) => {
	return (
		<thead className='font-gilroy-medium text-sm text-[#6C6D75]'>
			<tr className='h-[40px] text-left'>
				{columns.map((column, index) => (
					<th key={index} className='w-[150px] pl-4'>
						{column}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHead;
