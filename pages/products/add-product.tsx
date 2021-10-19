import { Box } from '@chakra-ui/react';
import Breadcrumbs from '@components/Breadcrumbs';
import Layout from '@components/Layout';
import AddEditProduct from '@modules/AddEditProduct.tsx';
import Head from 'next/head';
import { FC } from 'react';

const AddProduct: FC = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>Add Product</title>
      </Head>
      <Box w="100%" padding="90px 110px">
        <Breadcrumbs />
        <AddEditProduct />
      </Box>
    </Layout>
  );
};

export default AddProduct;
