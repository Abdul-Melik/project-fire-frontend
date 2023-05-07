import { home, clipboard, employees, coins, document, invoice } from 'src/assets';
import SidebarMenuItem from 'src/shared/components/menu/sidebar-menu/SidebarMenuItem';

type Props = {
	activeMenuItem: string;
};

const SidebarMenu = ({ activeMenuItem }: Props) => {
	return (
		<div className='flex flex-col gap-[8px] px-[14px] py-[10px]'>
			<SidebarMenuItem to='/home' src={home} label='Home' isActive={activeMenuItem === 'home'} />
			<SidebarMenuItem to='/projects' src={clipboard} label='Projects' isActive={activeMenuItem === 'projects'} />
			<SidebarMenuItem to='/employees' src={employees} label='Employees' isActive={activeMenuItem === 'employees'} />
			<SidebarMenuItem
				to='/financial-overview'
				src={coins}
				label='Financial Overview'
				isActive={activeMenuItem === 'financial-overview'}
			/>
			<SidebarMenuItem
				to='/project-reporting'
				src={document}
				label='Project Reporting'
				isActive={activeMenuItem === 'project-reporting'}
			/>
			<SidebarMenuItem to='/invoicing' src={invoice} label='Invoicing' isActive={activeMenuItem === 'invoicing'} />
		</div>
	);
};

export default SidebarMenu;
