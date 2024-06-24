import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import { BIcon } from '@/components/Common/bootstrapIcon';
import { useGetProfileQuery } from '@/appState/hooks';
import { useLogout } from '@/appState/auth';

const Header: React.FC<{ isFixed?: boolean }> = (prop) => {
  const [headerScrolled, setHeaderScrolled] = React.useState<boolean>(false);

  const handleHeaderScrolled = () => {
    if (window.scrollY > 100 || prop.isFixed) {
      setHeaderScrolled(true);
    } else {
      setHeaderScrolled(false);
    }
  };

  useEffect(() => {
    handleHeaderScrolled();
    document.addEventListener('scroll', handleHeaderScrolled);
    return () => {
      document.removeEventListener('scroll', handleHeaderScrolled);
    };
  }, []);

  return (
    <header id='header' className={`header ${!prop.isFixed && 'fixed-top'} ${headerScrolled && 'header-scrolled'}`}>
      <Container fluid='xl' className='d-flex align-items-center justify-content-between'>
        <Link href={'/'} className={'logo d-flex align-items-center'} passHref>
          {/* <Image src={NavLogo} width={60} height={40} alt='' /> */}
          <span>DocCollab</span>
        </Link>

        {/* Nav Menu */}
        <Navbar />
      </Container>
    </header>
  );
};

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: authUser } = useGetProfileQuery();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { mutate } = useLogout();

  const logoutMutate = (e: React.MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mutate({});
  };

  // const handleMenuClick = () => {
  //   if (showMobileMenu) {
  //     setShowMobileMenu(false);
  //   }
  // };

  return (
    <nav id='navbar' className={`navbar ${showMobileMenu ? 'navbar-mobile' : ''}`}>
      <ul>
        {authUser ? (
          <>
            <li className='d-grid ms-md-5'>
              <div className={'register btn btn-sm p-2 px-3 mx-2 mb-2 mb-md-0'}>
                <BIcon iconName='PersonCircle' size={18} className='me-1' />
                {authUser && `${authUser.first_name} ${authUser.last_name}`}
              </div>
            </li>
            <li className='d-grid'>
              <Link
                href={'#'}
                onClick={logoutMutate}
                className='btn btn-sm btn-dark text-white p-2 px-3 mx-2 mb-2 mb-md-0'
              >
                <BIcon iconName='Power' className='me-1' />
                Logout
              </Link>
            </li>
          </>
        ) : null}
      </ul>
      <BIcon
        iconName={showMobileMenu ? 'X' : 'List'}
        className={`mobile-nav-toggle ${showMobileMenu ? 'bi-x' : 'bi-list'}`}
        onClick={() => {
          setShowMobileMenu(!showMobileMenu);
        }}
      />
    </nav>
  );
};

export default Header;
