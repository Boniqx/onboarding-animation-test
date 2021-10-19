import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
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

      <ButtonGroup>
        <Button
          fontWeight="500"
          lineHeight="20px"
          color="#4F46E5"
          borderRadius="0px"
          borderTop="2px solid #4F46E5"
          variant="ghost"
        >
          1
        </Button>

        <Button fontWeight="500" lineHeight="20px" color="gray.500" variant="ghost">
          2
        </Button>

        <Button fontWeight="500" lineHeight="20px" color="gray.500" variant="ghost">
          3
        </Button>

        <Text alignItems="center" fontWeight="500" color="gray.500">
          ...
        </Text>

        <Button fontWeight="500" lineHeight="20px" color="gray.500" variant="ghost">
          8
        </Button>

        <Button fontWeight="500" lineHeight="20px" color="gray.500" variant="ghost">
          9
        </Button>

        <Button fontWeight="500" lineHeight="20px" color="gray.500" variant="ghost">
          10
        </Button>
      </ButtonGroup>

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
