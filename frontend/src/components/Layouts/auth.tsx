import React from 'react';
import Head from 'next/head';
import { LayoutType } from './types';
import { AppFooter } from './partials';

const Auth: React.FC<LayoutType> = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='theme-color' content='#ffffff' />
        <title>{'Auth - Max Test | Doc Collab'}</title>
      </Head>
      <div className='d-flex flex-column app-main'>
        {/* <AppHeader isFixed={headerFixed} /> */}
        <main id='main' className='my-auto'>
          {children}
        </main>
        <AppFooter />
      </div>
    </>
  );
};

export default Auth;
