import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await router.push(`/auth/login`);
    })();
  }, []);

  return <></>;
};

export default Home;
