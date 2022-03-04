import { Flex, Spinner } from '@chakra-ui/react';
import { FC } from 'react';
import ContentLayout from './Layout/ContentLayout';
import MainLayout from './Layout/MainLayout';

const Loading: FC = () => {
  return (
    <MainLayout>
      <ContentLayout>
        <Flex justifyContent="center" padding="20px" width="100%">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
      </ContentLayout>
    </MainLayout>
  );
};

export default Loading;
