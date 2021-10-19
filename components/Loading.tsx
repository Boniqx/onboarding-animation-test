import { Flex, Spinner } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <Layout>
      <Flex justifyContent="center" padding="20px" width="100%">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    </Layout>
  );
};

export default Loading;
