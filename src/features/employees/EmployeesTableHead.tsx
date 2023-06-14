import { arrow } from 'assets/media';

type HeadObject = {
	name: string;
	label: string;
};

type Props = {
	columns: HeadObject[];
	orderByField: string;
	orderDirection: string;
	handleSort: (label: string, orderDirection: string) => void;
};

const EmployeesTableHead = ({ columns, orderByField, orderDirection, handleSort }: Props) => {
	return (
		<thead>
			<tr className='h-[40px] text-left'>
				{columns.map((column, index) => (
					<th
						key={index}
						className={`w-[175px] px-4 py-2 font-gilroy-medium text-sm font-medium leading-[22px] text-slate-mist ${
							orderByField === column.label && column.label !== 'actions' ? 'bg-pale-silver' : ''
						}`}
					>
						{column.name}{' '}
						{column.label !== 'actions' && (
							<img
								src={arrow}
								className={`ml-3 inline cursor-pointer ${
									orderByField === column.label && orderDirection === 'asc' ? 'rotate-180' : ''
								}`}
								onClick={() => handleSort(column.label, orderDirection === 'asc' ? 'desc' : 'asc')}
							/>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default EmployeesTableHead;
