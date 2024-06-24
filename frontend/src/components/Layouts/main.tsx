import React, { useEffect } from 'react';
import Head from 'next/head';
import { LayoutType } from './types';
import { AppHeader, AppFooter } from './partials';

import Login from '../../../pages/auth/login';

import { Col, Container, Row } from 'react-bootstrap';
import { AuthLoader } from '@/appState/auth';
import Loader from '../Common/loader';
import { useRouter } from 'next/router';

const Main: React.FC<LayoutType> = (props) => {
  const { children, headerFixed } = props;
  const router = useRouter();

  const RedirectAuth = () => {
    useEffect(() => {
      const currentUrl = router.asPath;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        await router.push(`/auth/login?r=${currentUrl}`);
      })();
    });

    return <Login />;
  };

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='theme-color' content='#ffffff' />
        <title>{'Max Test | Doc Collab'}</title>
      </Head>
      <div className='d-flex flex-column app-main'>
        <AuthLoader renderLoading={() => <Loader fill />} renderUnauthenticated={() => <RedirectAuth />}>
          <AppHeader isFixed={headerFixed} />
          <Container>
            <Row className='gx-5 py-5 my-3'>
              <Col md={12}>{children}</Col>
            </Row>
          </Container>
          <AppFooter />
        </AuthLoader>
      </div>
    </>
  );
};

export default Main;
