import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface PaginationType {
  productsData: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  page: number;
  getPrevPage: () => void;
  getNextPage: () => void;
}

const Pagination: FC<PaginationType> = (props: PaginationType) => {
  const { page, getPrevPage, getNextPage, productsData } = props;

  return (
    <>
      {page != 0 ? (
        <Button
          onClick={(): void => {
            getPrevPage();
          }}
          fontWeight="500"
          lineHeight="20px"
          color="gray.500"
          variant="ghost"
        >
          <ArrowBackIcon /> Previous
        </Button>
      ) : (
        <Flex></Flex>
      )}

      {productsData.hasNextPage ? (
        <Button
          onClick={(): void => {
            getNextPage();
          }}
          fontWeight="500"
          lineHeight="20px"
          color="gray.500"
          variant="ghost"
        >
          Next <ArrowForwardIcon />
        </Button>
      ) : (
        <Flex></Flex>
      )}
    </>
  );
};

export default Pagination;
