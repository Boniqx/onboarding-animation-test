import { useMutation } from '@apollo/client';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { CREATE_PRODUCT } from 'graphql/mutations/createproduct';
import { UPDATE_PRODUCT } from 'graphql/mutations/updateproduct';
import Router from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { CreateProductInput } from 'types/types';
import * as yup from 'yup';

interface AddEditProductTypes {
  isEdit?: boolean;
  id?: string;
  name?: string;
  description?: string;
}

const AddEditProduct: FC<AddEditProductTypes> = (props: AddEditProductTypes): JSX.Element => {
  const [uploadErrors, setUploadErrors] = useState<string>('');
  const [file, setFile] = useState<File | null>();
  const toast = useToast();

  const useYupValidationResolver = (validationSchema): any =>
    useCallback(
      async (data) => {
        try {
          const values = await validationSchema.validate(data, {
            abortEarly: false,
          });

          return {
            values,
            errors: {},
          };
        } catch (errors) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message,
                },
              }),
              {}
            ),
          };
        }
      },
      [validationSchema]
    );

  const validationSchema = yup.object({
    name: yup.string().required('Name is Required'),
    description: yup.string().required('Description is Required'),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const { register, handleSubmit } = useForm<CreateProductInput>({
    resolver,
    defaultValues: {
      name: props.name ? props.name : '',
      description: props.description ? props.description : '',
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      setUploadErrors('');
      setFile(acceptedFiles[0]);
    } else {
      setUploadErrors('Invalid File Format.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/jpg, image/png, image/gif',
  });

  const [createProduct, { loading: createLoading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: (res) => {
      toast({
        position: 'top',
        title: 'Product Successfully Created',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      Router.push(`/edit-product/${res.createProduct.id}`);
    },
  });

  const [updateProduct, { loading: updateLoading }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      toast({
        position: 'top',
        title: 'Product Successfully Updated',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const saveProduct = (values): void => {
    if (props.isEdit) {
      updateProduct({ variables: { id: props.id, ...values } });
    } else {
      createProduct({ variables: { ...values } });
    }
  };

  return (
    <>
      <HStack
        onSubmit={handleSubmit((values) => {
          saveProduct(values);
        })}
        as="form"
        align="baseline"
        shadow="sm"
        borderWidth="1px"
        background="#fff"
        w="100%"
        borderRadius="md"
        padding="30px"
      >
        <FormControl id="image" width="auto" marginRight="40px">
          <FormLabel fontWeight="500"> Photo </FormLabel>
          <Flex
            {...getRootProps()}
            w="375px"
            height="260px"
            border="2px dashed #E5E7EB"
            boxSizing="border-box"
            backgroundSize="cover"
            boxShadow={file ? 'inset 0 0 0 2000px rgba(0, 0, 0, 0.36)' : ''}
            justifyContent="center"
            backgroundImage={`url(${file && URL.createObjectURL(file)})`}
          >
            <input {...getInputProps()} />
            <Flex align="center">
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <VStack>
                  <Image src="/images/image-upload.png" height="auto" width="32px" />

                  <HStack>
                    <Text
                      fontWeight={500}
                      background={file ? 'white' : ''}
                      borderRadius="md"
                      padding="0px 6px"
                      color="purple.600"
                    >
                      {' '}
                      Upload a file{' '}
                    </Text>
                    <Text fontWeight={500} color={file ? 'white' : ''}>
                      {' '}
                      or drag and drop{' '}
                    </Text>
                  </HStack>
                  <Text color={file ? 'white' : ''} fontWeight={400} fontSize="0.75em">
                    {' '}
                    PNG, JPG, GIF up to 10MB{' '}
                  </Text>
                </VStack>
              )}
            </Flex>
          </Flex>
          <Text color="tomato"> {uploadErrors} </Text>
        </FormControl>

        <VStack width="100%">
          <FormControl id="name">
            <FormLabel fontWeight="500"> Title </FormLabel>
            <Input disabled={createLoading || updateLoading} {...register('name')} placeholder="Enter title" />
          </FormControl>

          <FormControl id="description">
            <FormLabel fontWeight="500"> Description </FormLabel>
            <Textarea
              disabled={updateLoading || createLoading}
              {...register('description')}
              placeholder="Enter description"
            />
          </FormControl>

          <HStack width="100%" justifyContent="end" marginTop="50px !important">
            <Button radius="md" padding="10px 50px" variant="secondary">
              Cancel
            </Button>
            <Button
              isLoading={updateLoading || createLoading}
              loadingText="Saving.."
              radius="md"
              padding="10px 50px"
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

export default AddEditProduct;
