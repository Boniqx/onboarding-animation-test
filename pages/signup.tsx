import { useMutation } from '@apollo/client';
import { Box, Button, Center, Container, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { SIGN_UP } from 'graphql/mutations/signup';
import Head from 'next/head';
import Router from 'next/router';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type SignupInputsData = {
  firstname: string;
  lastname: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
};

const MainModule: FC = () => {
  const [error, setError] = useState<any>();

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
    firstname: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .required('First Name is Required'),
    lastname: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .required('Last Name is Required'),
    emailAddress: yup.string().email().required('Email Name is Required'),
    password: yup.string().required('Password is Required'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupInputsData>({ resolver });
  const [signUp, { data, loading }] = useMutation(SIGN_UP, {
    onError: (err) => {
      setError(err);
    },
    onCompleted: () => {
      setError(null);
    },
  });

  if (data && !error) {
    Router.push('/login');
  }

  const saveSignup = (signUpData): void => {
    signUp({ variables: { ...signUpData } });
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Sign Up</title>
        </Head>

        <Box
          width="100%"
          as="form"
          onSubmit={handleSubmit((values) => {
            const signUpData = {
              emailAddress: values.emailAddress,
              firstname: values.firstname,
              lastname: values.lastname,
              password: values.password,
            };
            saveSignup(signUpData);
          })}
          height="calc(100vh - 64px)"
          display="flex"
          align-items="center"
          justify-content="center"
        >
          <Container variant="floating">
            <Center align-items="center" justify-content="center" w="100%">
              <Heading
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding="0px"
                position="static"
                width="600px"
                height="57px"
                left="0px"
                top="30px"
                fontSize="1.875em"
                borderBottom="1px solid #E2E8F0"
              >
                Sign up
              </Heading>
            </Center>

            <Stack w="100%" padding="0px 30px">
              <Box padding="40px 0px">
                <FormControl id="firstname">
                  <FormLabel fontWeight="500" mb="8px">
                    First Name
                  </FormLabel>
                  <Input
                    isInvalid={errors.hasOwnProperty('firstname')}
                    focusBorderColor={errors.hasOwnProperty('firstname') ? 'crimson' : 'blue.400'}
                    errorBorderColor="crimson"
                    disabled={loading}
                    {...register('firstname')}
                    placeholder="Enter first name"
                    size="sm"
                  />
                  <Text color="tomato" fontSize="sm">
                    {errors.firstname?.message}
                  </Text>
                </FormControl>

                <FormControl id="lastname">
                  <FormLabel marginTop="20px" fontWeight="500" mb="8px">
                    Last Name
                  </FormLabel>
                  <Input
                    isInvalid={errors.hasOwnProperty('lastname')}
                    focusBorderColor={errors.hasOwnProperty('lastname') ? 'crimson' : 'blue.400'}
                    errorBorderColor="crimson"
                    disabled={loading}
                    {...register('lastname')}
                    placeholder="Enter last name"
                    size="sm"
                  />
                  <Text color="tomato" fontSize="sm">
                    {errors.lastname?.message}
                  </Text>
                </FormControl>

                <FormControl id="emailAddress">
                  <FormLabel marginTop="20px" fontWeight="500" mb="8px">
                    Email
                  </FormLabel>
                  <Input
                    isInvalid={errors.hasOwnProperty('emailAddress')}
                    focusBorderColor={errors.hasOwnProperty('emailAddress') ? 'crimson' : 'blue.400'}
                    errorBorderColor="crimson"
                    disabled={loading}
                    {...register('emailAddress')}
                    type="email"
                    placeholder="email@example.com"
                    size="sm"
                  />
                  <Text color="tomato" fontSize="sm">
                    {errors.emailAddress?.message}
                  </Text>
                </FormControl>

                <FormControl id="password">
                  <FormLabel marginTop="20px" fontWeight="500" mb="8px">
                    Password
                  </FormLabel>
                  <Input
                    isInvalid={errors.hasOwnProperty('password')}
                    focusBorderColor={errors.hasOwnProperty('password') ? 'crimson' : 'blue.400'}
                    errorBorderColor="crimson"
                    disabled={loading}
                    {...register('password')}
                    placeholder="Enter Password"
                    type="password"
                    size="sm"
                  />
                  <Text color="tomato" fontSize="sm">
                    {errors.password?.message}
                  </Text>
                </FormControl>

                <FormControl id="confirmPassword">
                  <FormLabel marginTop="20px" fontWeight="500" mb="8px">
                    Confirm Password
                  </FormLabel>
                  <Input
                    isInvalid={errors.hasOwnProperty('confirmPassword')}
                    focusBorderColor={errors.hasOwnProperty('confirmPassword') ? 'crimson' : 'blue.400'}
                    errorBorderColor="crimson"
                    disabled={loading}
                    {...register('confirmPassword')}
                    placeholder="Confirm Password"
                    type="password"
                    size="sm"
                  />
                  <Text color="tomato" fontSize="sm">
                    {errors.confirmPassword?.message}
                  </Text>
                </FormControl>
              </Box>
              {error &&
                error.graphQLErrors.map(({ message }, i) => (
                  <Text key={i} color="tomato" fontSize="sm">
                    {message}
                  </Text>
                ))}
              <Button isLoading={loading} loadingText="Loading" variant="primary" type="submit">
                Sign up
              </Button>
            </Stack>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default MainModule;
