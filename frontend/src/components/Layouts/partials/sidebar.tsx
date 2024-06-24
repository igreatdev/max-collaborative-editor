import { BIcon } from '@/components/Common/bootstrapIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const MenuLink = ({ to, children, ...props }: any) => {
  const baseNavLinkClass = 'nav-link scrollto px-3';
  const currentRoute = usePathname();

  return (
    <Link href={to} className={currentRoute === to ? `${baseNavLinkClass} active` : `${baseNavLinkClass}`} {...props}>
      {children}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const menuLists = [
    { title: 'Dashboard', to: '/app/dashboard' },
    { title: 'Investment Opportunities', to: '/app/investments' },
    { title: 'My Investments', to: '/app/investments/my-investments' },
  ];

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMenuClick = () => {
    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  return (
    <Card className='bg-light border-0 shadow-sm' style={{ minHeight: '400px' }}>
      <Card.Body>
        <nav id='navbar' className={` ${showMobileMenu ? 'navbar-mobile' : ''}`}>
          <ul className='nav nav-fill flex-column'>
            {menuLists.map(({ title, to }, index) => (
              <li key={index}>
                <MenuLink to={to} onClick={handleMenuClick}>
                  <span>{title}</span>
                </MenuLink>
              </li>
            ))}
          </ul>
          <BIcon
            iconName={showMobileMenu ? 'X' : 'List'}
            className={`mobile-nav-toggle ${showMobileMenu ? 'bi-x' : 'bi-list'}`}
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
            }}
          />
        </nav>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
