import { Box } from '@chakra-ui/react';
import Breadcrumbs from '@components/Breadcrumbs';
import ContentLayout from '@components/Layout/ContentLayout';
import MainLayout from '@components/Layout/MainLayout';
import AddEditProduct from '@modules/AddEditProduct.tsx';
import Head from 'next/head';
import { FC } from 'react';

const AddProduct: FC = (): JSX.Element => {
  return (
    <MainLayout>
      <ContentLayout>
        <Head>
          <title>Add Product</title>
        </Head>
        <Box w="100%">
          <Breadcrumbs />
          <AddEditProduct />
        </Box>
      </ContentLayout>
    </MainLayout>
  );
};

export default AddProduct;
