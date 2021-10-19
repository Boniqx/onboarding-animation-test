import { AddIcon } from '@chakra-ui/icons';
import { Button, Grid, Heading, HStack, Skeleton, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import Layout from '@components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

const ProductSkeleton: FC = () => {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <VStack width="100%" padding="90px 110px">
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

          <Link href={`/products/add-product`}>
            <Button variant="primaryAction">
              <AddIcon />
              <Text marginLeft="0.6875em" fontSize="1.125em">
                Add Product
              </Text>
            </Button>
          </Link>
        </HStack>
        <Stack width="100%">
          <Grid paddingBottom="40px" templateColumns="repeat(4, 1fr)" gap={6}>
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
          </Grid>
          <Grid paddingBottom="40px" templateColumns="repeat(4, 1fr)" gap={6}>
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
          </Grid>
          <Grid paddingBottom="40px" borderBottom="1px solid #E5E7EB" templateColumns="repeat(4, 1fr)" gap={6}>
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
            <Skeleton height="300px" />
          </Grid>
        </Stack>
      </VStack>
    </Layout>
  );
};

export default ProductSkeleton;
