import { useMutation } from '@apollo/client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DELETE_PRODUCT } from 'graphql/mutations/deleteproduct';
import Router from 'next/router';
import { FC } from 'react';

interface DeleteProductProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  shouldReturnHome?: boolean;
  reloadFunction?: () => void;
}

const DeleteProduct: FC<DeleteProductProps> = (props: DeleteProductProps) => {
  const { isOpen, onClose, id } = props;

  const toast = useToast();
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      onClose();

      toast({
        position: 'top',
        title: 'Product Successfully Deleted',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      if (props.reloadFunction) {
        props.reloadFunction();
      }

      if (props.shouldReturnHome) {
        Router.push('/');
      }
    },
  });

  const deleteProductFunction = async (): Promise<void> => {
    deleteProduct({ variables: { id } });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete this product? You can’t undo this action afterwards.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} background="gray.100" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              _hover={{
                color: 'black',
                bg: 'gray.300',
                cursor: 'pointer',
              }}
              isLoading={loading}
              color="#fff"
              background="red.500"
              onClick={(): Promise<void> => deleteProductFunction()}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProduct;
