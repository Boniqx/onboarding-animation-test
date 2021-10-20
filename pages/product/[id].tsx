import AddToCartIcon from '@assets/icons/add-to-cart';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Flex, Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Breadcrumbs from '@components/Breadcrumbs';
import DeleteProduct from '@components/DeleteProduct';
import Layout from '@components/Layout';
import client from '@utils/client';
import { PRODUCTS_IDS } from 'graphql/queries/productIds';
import { SINGLE_PRODUCT } from 'graphql/queries/singleProduct';
import Cookies from 'js-cookie';
import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

interface SingleProduct {
  product: {
    edges: {
      node: {
        name: string;
        id: string;
        description: string;
        owner: {
          id: string;
        };
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userAuth = Cookies.get('auth_user');

  return (
    <>
      <Head>
        <title>{product?.name}</title>
      </Head>
      <Layout>
        <DeleteProduct id={product.id} isOpen={isOpen} onOpen={onOpen} onClose={onClose} shouldReturnHome={true} />

        <Box w="100%" padding="90px 110px">
          <Breadcrumbs dynamicLink={product?.name} />
          <HStack alignItems="flex-start" align="baseline" w="100%" borderRadius="md" padding="30px">
            <Box id="image" width="auto" marginRight="40px">
              <Flex
                w="375px"
                height="260px"
                borderRadius="lg"
                boxSizing="border-box"
                backgroundSize="cover"
                justifyContent="center"
                backgroundImage={`url("/Media placeholder.png")`}
              ></Flex>
              <Button marginTop="22px" width="100%" background="#FAF5FF">
                <AddToCartIcon />
                <Text marginLeft="0.6875em" color="purple.600">
                  Add to cart
                </Text>
              </Button>
            </Box>

            <VStack alignItems="baseline" width="100%">
              <HStack justifyContent="space-between" width="100%">
                <Heading> {product?.name} </Heading>
                {userAuth === product.owner.id && (
                  <ButtonGroup>
                    <Link href={`/edit-product/${product.id}`}>
                      <Button>
                        <EditIcon fontWeight={900} color="gray.700" />
                      </Button>
                    </Link>
                    <Button onClick={onOpen}>
                      <DeleteIcon fontWeight={900} color="gray.700" />
                    </Button>
                  </ButtonGroup>
                )}
              </HStack>
              <Text> {product?.description} </Text>

              <HStack width="100%" justifyContent="end" marginTop="50px !important"></HStack>
            </VStack>
          </HStack>
        </Box>
      </Layout>
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
    fallback: false,
  };
}

export async function getStaticProps(props: SingleProductIds): Promise<GetStaticPropsResult<SingleProduct>> {
  const { params } = props;
  const data = await client.query({
    query: SINGLE_PRODUCT,
    fetchPolicy: 'no-cache',
    variables: { id: params.id },
  });

  const product = data.data.products;

  return {
    props: {
      product,
    },
  };
}
