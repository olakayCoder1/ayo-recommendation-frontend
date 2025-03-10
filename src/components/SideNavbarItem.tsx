import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

interface SubNavItem {
  to: string;
  label: string;
}

interface SideNavbarItemProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  subItems?: SubNavItem[];
}

const SideNavbarItem: React.FC<SideNavbarItemProps> = ({ to, icon, label, subItems }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if this item or any of its subitems are active
  const isActive = to ? location.pathname.includes(to) : 
    subItems?.some(item => location.pathname.includes(item.to));
  
  // If there are subitems, this is a collapsible menu item
  const isCollapsible = subItems && subItems.length > 0;
  
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      {isCollapsible ? (
        // Collapsible parent item
        <div className="flex flex-col">
          <button
            onClick={toggleCollapse}
            className={`group relative flex items-center justify-between text-sm font-normal gap-2.5 rounded-sm py-2 px-4 w-full duration-300 ease-in-out hover:bg-gray-300 ${
              isActive ? 'bg-gray-400' : ''
            }`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              {label}
            </div>
            {isOpen ? <IoChevronDown /> : <IoChevronForward />}
          </button>
          
          {/* Subitems that appear when collapsed item is open */}
          {isOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              {subItems.map((subItem, index) => (
                <li key={index}>
                  <NavLink
                    to={subItem.to}
                    className={({ isActive }) => 
                      `block text-sm py-2 px-2 rounded-sm ${
                        isActive ? 'bg-gray-400' : ''
                      } hover:bg-gray-300 duration-300 ease-in-out`
                    }
                  >
                    {subItem.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        // Regular nav item with link
        <NavLink
          to={to || '#'}
          className={`group relative flex items-center text-sm font-normal gap-2.5 rounded-sm py-2 px-4 duration-300 ease-in-out hover:bg-gray-300 ${
            isActive ? 'bg-gray-400' : ''
          }`}
        >
          {icon}
          {label}
        </NavLink>
      )}
    </li>
  );
};

export default SideNavbarItem;