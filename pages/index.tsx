import { Grid, Text } from '@chakra-ui/react';
import Layout from '@components/Layout';
import NextImage from 'next/image';
import { FC } from 'react';

const Home: FC = (): JSX.Element => {
  return (
    <Layout>
      <Grid placeContent="center" h="100vh">
        <>
          <NextImage src="/logo.png" width={200} height={200} />
          <Text fontSize="xl" mt="2rem" textAlign="center">
            Welcome to HOV!
          </Text>
        </>
      </Grid>
    </Layout>
  );
};

export default Home;
