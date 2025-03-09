import { NavLink, useLocation } from 'react-router-dom';

interface SideNavbarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SideNavbarItem: React.FC<SideNavbarItemProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  console.log(location.pathname , isActive)

  return (
    <li>
      <NavLink
        to={to}
        className={`group relative flex items-center text-sm font-normal gap-2.5 rounded-sm py-2 px-4 duration-300 ease-in-out hover:bg-gray-300  ${
          isActive ? 'bg-gray-400' : ''
        }`}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

export default SideNavbarItem;

