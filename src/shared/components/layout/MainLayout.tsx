import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { logo } from "src/assets";
import AuthContext from "src/shared/context/auth-context";
import UserCard from "src/shared/components/cards/UserCard";
import SidebarMenu from "src/shared/components/menus/sidebar-menu/SidebarMenu";
import UserMenu from "src/shared/components/menus/user-menu/UserMenu";

type Props = {
  activeMenuItem: string;
  children: React.ReactNode;
};

const MainLayout = ({ activeMenuItem, children }: Props) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const handleHamburgerMenuToggle = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  return (
    <div className='flex min-h-screen'>
      {/* Originalni sadržaj */}
      <div className='hidden items-center gap-[10px] border-r border-opal-mist bg-gradient-to-b from-frost-white to-seafoam-green md:block'>
        <img src={logo} className='w-2/3 py-[30px] pl-7 pr-0' />
        <UserCard
          className='mx-[14px] my-[10px] rounded-md border border-ashen-grey'
          userInfo={user}
          isUserMenuOpen={isUserMenuOpen}
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        />
        <div className='relative'>
          {isUserMenuOpen && (
            <UserMenu
              className='right-0 top-0 w-[15vw] overflow-hidden rounded-md border border-ashen-grey bg-seafoam-green shadow-[3px_3px_3px_rgba(0,0,0,0.3)]'
              onClick={() => {
                logout();
                navigate("/login");
              }}
            />
          )}
        </div>
        <SidebarMenu activeMenuItem={activeMenuItem} />
      </div>

      {/* Hamburger Meni */}
      <div className='fixed left-0 top-0 z-10 w-full bg-frost-white md:hidden'>
        <div className='flex items-center justify-between px-4 py-2'>
          <div>
            <button className='text-3xl text-deep-forest' onClick={handleHamburgerMenuToggle}>
              ☰
            </button>
          </div>
          <div>
            <img src={logo} className='mx-auto w-2/3 py-[30px] pl-7 pr-0' />
          </div>
          <div></div>
        </div>
        {isHamburgerMenuOpen && (
          <div className='border-b border-ashen-grey bg-gradient-to-b from-frost-white to-seafoam-green px-4 py-2'>
            <UserCard
              className='mx-[14px] my-[10px] rounded-md border border-ashen-grey'
              userInfo={user}
              isUserMenuOpen={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <div className='relative'>
                <UserMenu
                  className='right-0 top-0 w-[15vw] overflow-hidden rounded-md border border-ashen-grey bg-seafoam-green shadow-[3px_3px_3px_rgba(0,0,0,0.3)]'
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                />
              </div>
            )}
            <div>
              <SidebarMenu activeMenuItem={activeMenuItem} />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className='mt-20 flex-1'>{children}</div>
    </div>
  );
};

export default MainLayout;
