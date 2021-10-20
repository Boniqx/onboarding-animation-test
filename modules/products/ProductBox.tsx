import AddToCartIcon from '@assets/icons/add-to-cart';
import { Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';

interface ProductBoxType {
  product: {
    cursor: string;
    node: {
      id: string;
      name: string;
      description: string;
      owner: {
        id: string;
      };
    };
  };
  setToBeDeletedId: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
}

const ProductBox: FC<ProductBoxType> = (props: ProductBoxType) => {
  const userAuth = Cookies.get('auth_user');
  const { product, setToBeDeletedId, onOpen } = props;

  return (
    <Box maxW="sm" position="relative" background="white" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {userAuth === product.node.owner.id && (
        <Menu>
          <MenuButton
            position="absolute"
            background="gray.100"
            borderRadius="100%"
            top="20px"
            right="20px"
            aria-label="dotted-icon"
          >
            <Image width="100%" borderRadius="0px" src="/images/Icon button.png" alt="placeholder" />
          </MenuButton>
          <MenuList>
            <Link href={`/edit-product/${product.node.id}`}>
              <MenuItem>Edit</MenuItem>
            </Link>
            <MenuItem
              onClick={(): void => {
                setToBeDeletedId(product.node.id);
                onOpen();
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <Image width="100%" borderRadius="0px" src="/images/Media placeholder.png" alt="placeholder" />
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          <Link href={`/product/${product.node.id}`}>
            <Text
              fontSize="1.125em"
              _hover={{
                color: 'purple.700',
                cursor: 'pointer',
              }}
            >
              {' '}
              {product.node.name}
            </Text>
          </Link>
        </Box>
        <Text noOfLines={[2, 5]}> {product.node.description} </Text>
      </Box>

      <Flex justifyContent="center" width="100%">
        <Button marginBottom="20px" width="250px" background="#FAF5FF">
          <AddToCartIcon />
          <Text marginLeft="0.6875em" color="purple.600">
            Add to cart
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductBox;
