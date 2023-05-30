import { home, clipboard, employees, coins, document, invoice } from "src/assets";
import SidebarMenuItem from "src/shared/components/menus/sidebar-menu/SidebarMenuItem";

type Props = {
  activeMenuItem: string;
  isHamburgerMenu?: boolean;
};

const SidebarMenu = ({ activeMenuItem, isHamburgerMenu }: Props) => {
  return (
    <div className='flex flex-col gap-[8px] px-[14px] py-[10px]'>
      <SidebarMenuItem
        to='/home'
        src={home}
        label='Home'
        isActive={activeMenuItem === "home"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to='/projects'
        src={clipboard}
        label='Projects'
        isActive={activeMenuItem === "projects"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to='/employees'
        src={employees}
        label='Employees'
        isActive={activeMenuItem === "employees"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to='/financial-overview'
        src={coins}
        label='Financial Overview'
        isActive={activeMenuItem === "financial-overview"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to='/project-reporting'
        src={document}
        label='Project Reporting'
        isActive={activeMenuItem === "project-reporting"}
        isHamburgerMenu={isHamburgerMenu}
      />
      <SidebarMenuItem
        to='/invoicing'
        src={invoice}
        label='Invoicing'
        isActive={activeMenuItem === "invoicing"}
        isHamburgerMenu={isHamburgerMenu}
      />
    </div>
  );
};

export default SidebarMenu;
