import { arrow } from 'src/assets/media';
import { TableHeadProps } from 'src/types';

const TableHead = ({ columns, orderByField, orderDirection, handleSort }: TableHeadProps) => {
	return (
		<thead>
			<tr className='h-[40px] text-left'>
				{columns.map((column, index) => (
					<th
						key={index}
						className={`w-[150px] pl-4 font-gilroy-medium text-sm font-medium leading-[22px] text-slate-mist ${
							orderByField === column.label ? 'bg-pale-silver' : ''
						}`}
					>
						{column.name}{' '}
						<img
							src={arrow}
							className={`ml-3 inline cursor-pointer ${
								orderByField === column.label && orderDirection === 'asc' ? 'rotate-180' : ''
							}`}
							onClick={() => handleSort(column.label, orderDirection === 'asc' ? 'desc' : 'asc')}
						/>
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHead;
