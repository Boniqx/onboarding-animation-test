import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Loading from '@components/Loading';
import client from '@utils/client';
import theme from '@utils/themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { FC, useEffect, useState } from 'react';
const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      SetLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      SetLoading(false);
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
