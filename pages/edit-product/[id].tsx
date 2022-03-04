import { Box } from '@chakra-ui/react';
import Breadcrumbs from '@components/Breadcrumbs';
import ContentLayout from '@components/Layout/ContentLayout';
import MainLayout from '@components/Layout/MainLayout';
import AddEditProduct from '@modules/AddEditProduct.tsx';
import client from '@utils/client';
import { PRODUCTS_IDS } from 'graphql/queries/productIds';
import { SINGLE_PRODUCT } from 'graphql/queries/singleProduct';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import { FC, useEffect } from 'react';

interface SingleProduct {
  product: {
    edges: {
      node: {
        name: string;
        id: string;
        description: string;
      };
    };
  };
}

interface SingleProductIds {
  params: {
    id: string;
  };
}

const Header: FC<SingleProduct> = (props: SingleProduct) => {
  const product = props.product.edges[0].node;

  useEffect(() => {
    return (): void => {
      client.resetStore();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{product?.name}</title>
      </Head>
      <MainLayout>
        <ContentLayout>
          <Box w="100%">
            <Breadcrumbs dynamicLink={`/products/${product?.name}`} />
            <AddEditProduct isEdit={true} id={product?.id} name={product?.name} description={product?.description} />
          </Box>
        </ContentLayout>
      </MainLayout>
    </>
  );
};

export default Header;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const data = await client.query({
    query: PRODUCTS_IDS,
    variables: { first: 10000 },
  });

  const edges = data.data.products.edges;

  const paths = edges.map((edge) => {
    return { params: edge.node };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(props: SingleProductIds): Promise<GetStaticPropsResult<SingleProduct>> {
  const { params } = props;
  const data = await client.query({
    query: SINGLE_PRODUCT,
    variables: { id: params.id },
    fetchPolicy: 'no-cache',
  });

  const product = data.data.products;

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
}
