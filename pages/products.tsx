import { NetworkStatus, useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Grid, Heading, HStack, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import DeleteProduct from '@components/DeleteProduct';
import ContentLayout from '@components/Layout/ContentLayout';
import MainLayout from '@components/Layout/MainLayout';
import Pagination from '@modules/products/Pagination';
import ProductBox from '@modules/products/ProductBox';
import ProductSkeleton from '@modules/products/ProductSkeleton';
import client from '@utils/client';
import { PRODUCTS } from 'graphql/queries/products';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';
interface PaginatedDataType {
  cursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: Array<{
    cursor: string;
    node: {
      id: string;
      name: string;
      description: string;
      owner: {
        id: string;
      };
    };
  }>;
}

const Products: FC = () => {
  const token = Cookies.get('token');
  const [toBeDeletedId, setToBeDeletedId] = useState('');
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<Array<PaginatedDataType>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, data, fetchMore, networkStatus } = useQuery(PRODUCTS, {
    variables: { first: 12 },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      paginatedData(data);
    },
  });

  useEffect(() => {
    return (): void => {
      client.resetStore();
    };
  }, []);

  const paginatedData = useCallback(
    (data): void => {
      const paginatedProducts = {
        cursor: data.products.pageInfo.endCursor,
        hasNextPage: data.products.pageInfo.hasNextPage,
        hasPreviousPage: data.products.pageInfo.hasPreviousPage,
        data: data.products.edges,
      };

      const clonedProduct = [...products];

      if (clonedProduct[page]) {
        clonedProduct[page] = paginatedProducts;
        setProducts(clonedProduct);
      } else {
        clonedProduct.push(paginatedProducts);
        setProducts(clonedProduct);
      }
    },
    [data]
  );

  const productsData = products[page];

  // Disable rule due to eslint/typescript bug when evaluating ! statements
  // https://github.com/typescript-eslint/typescript-eslint/issues/2421
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!productsData || loading || networkStatus === NetworkStatus.refetch) return <ProductSkeleton />;

  const reload = async (): Promise<void> => {
    await fetchMore({
      variables: {
        after: page === 0 ? null : products[page - 1].cursor,
        first: 12,
      },
    });
  };

  const getNextPage = async (): Promise<void> => {
    setPage(page + 1);
    await fetchMore({
      variables: {
        after: products[page].cursor,
        first: 12,
      },
    });
  };

  const getPrevPage = async (): Promise<void> => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  return (
    <MainLayout>
      <ContentLayout>
        <Head>
          <title>Products</title>
        </Head>

        <DeleteProduct id={toBeDeletedId} reloadFunction={reload} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <VStack width="100%">
          <HStack
            marginBottom="50px"
            direction={{ base: 'column', md: 'row' }}
            width="100%"
            paddingBottom="9px"
            borderBottom="solid 1px #E2E8F0"
            flexGrow={1}
            alignItems="baseline"
            mt={{ base: 4, md: 0 }}
          >
            <Heading fontSize="1.875em"> Products </Heading>
            <Spacer />

            {token && (
              <Link href={`/products/add-product`}>
                <Button variant="primaryAction">
                  <AddIcon />
                  <Text marginLeft="0.6875em" fontSize="1.125em">
                    Add Product
                  </Text>
                </Button>
              </Link>
            )}
          </HStack>

          <Grid
            paddingBottom="40px"
            borderBottom="1px solid #E5E7EB"
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
            gap={6}
          >
            {productsData.data.map((product, key) => (
              <ProductBox product={product} setToBeDeletedId={setToBeDeletedId} onOpen={onOpen} key={key} />
            ))}
          </Grid>

          <HStack marginTop="0px !important" width="100%" justifyContent="space-between">
            <Pagination page={page} getPrevPage={getPrevPage} getNextPage={getNextPage} productsData={productsData} />
          </HStack>
        </VStack>
      </ContentLayout>
    </MainLayout>
  );
};

export default Products;
