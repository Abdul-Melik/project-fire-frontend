import { arrow } from 'src/assets/media';

type Props = {
	columns: headObject[];
	handleSort: Function;
	selectedColumn: string;
};
interface headObject {
	name: string;
	label: string;
	order: string;
}

const TableHead = ({ columns, handleSort, selectedColumn }: Props) => {
	return (
		<thead>
			<tr className='h-[40px] text-left'>
				{columns.map((column, index) => (
					<th
						key={index}
						className={`w-[150px] pl-4 font-gilroy-medium text-sm font-medium leading-[22px] text-slate-mist ${
							selectedColumn === column.label ? 'bg-pale-silver' : ''
						}`}
					>
						{column.name}{' '}
						<img
							src={arrow}
							onClick={() => {
								column.order === 'asc' ? (column.order = 'desc') : (column.order = 'asc');
								handleSort(column.label, column.order);
							}}
							className={`ml-3 inline cursor-pointer ${column.order === 'asc' ? 'rotate-180' : ''}`}
						/>
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHead;
