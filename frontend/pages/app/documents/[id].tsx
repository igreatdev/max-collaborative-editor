'use client';

import React from 'react';
import { Main as Layout } from '@/components/Layouts';
import { Breadcrumb, Card, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetDocumentDetailsQuery, useGetProfileQuery } from '@/appState/hooks';
import Loader from '@/components/Common/loader';
import dynamic from 'next/dynamic';

const CollaborativeEditor = dynamic(async () => await import('@/components/Common/editor'), { ssr: false });

const Document: React.FC<{ documentId: number }> = (props) => {
  const { documentId } = props;
  const { data, isPending } = useGetDocumentDetailsQuery(documentId);
  const { data: authUser } = useGetProfileQuery();

  return (
    <main id='main'>
      <Container>
        {isPending ? (
          <Loader />
        ) : (
          <>
            <Breadcrumb className='p-2 small bg-light mb-4 rounded' listProps={{ className: 'mb-0' }}>
              <Breadcrumb.Item linkAs={Link} href='./'>
                Documents
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{data?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <h3>{data ? data.title : null}</h3>
            {data && authUser ? <CollaborativeEditor documentId={data.id} user={authUser} /> : null}
          </>
        )}
      </Container>
    </main>
  );
};

const Page = () => {
  const { query, isReady } = useRouter();
  const documentId = query.id;

  return (
    <Layout headerFixed={true}>
      {isReady && documentId && typeof documentId === 'string' ? (
        <Document documentId={parseInt(documentId)} />
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Page;
