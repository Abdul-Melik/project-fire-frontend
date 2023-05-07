import * as assets from 'src/assets';
import SidebarMenuItem from 'src/shared/components/menu/sidebar-menu/SidebarMenuItem';

type Props = {
	activeMenuItem: string;
};

const SidebarMenu = ({ activeMenuItem }: Props) => {
	return (
		<div className='flex flex-col gap-[8px] px-[14px] py-[10px]'>
			<SidebarMenuItem to='/home' src={assets.home} label='Home' isActive={activeMenuItem === 'home'} />
			<SidebarMenuItem
				to='/projects'
				src={assets.clipboard}
				label='Projects'
				isActive={activeMenuItem === 'projects'}
			/>
			<SidebarMenuItem
				to='/employees'
				src={assets.employees}
				label='Employees'
				isActive={activeMenuItem === 'employees'}
			/>
			<SidebarMenuItem
				to='/financial-overview'
				src={assets.coins}
				label='Financial Overview'
				isActive={activeMenuItem === 'financial-overview'}
			/>
			<SidebarMenuItem
				to='/project-reporting'
				src={assets.document}
				label='Project Reporting'
				isActive={activeMenuItem === 'project-reporting'}
			/>
			<SidebarMenuItem
				to='/invoicing'
				src={assets.invoice}
				label='Invoicing'
				isActive={activeMenuItem === 'invoicing'}
			/>
		</div>
	);
};

export default SidebarMenu;
