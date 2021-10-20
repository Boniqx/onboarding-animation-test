import { ApolloError, useMutation } from '@apollo/client';
import { Box, Button, Center, Container, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import MainLayout from '@components/Layout/MainLayout';
import client from '@utils/client';
import { AUTHENTICATE } from 'graphql/mutations/authenticate';
import { ME } from 'graphql/queries/me';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthenticateInput } from 'types/types';
import * as yup from 'yup';

const MainModule: FC = () => {
  const [error, setError] = useState<ApolloError | null>();
  const [authenticate, { data, loading }] = useMutation(AUTHENTICATE, {
    onCompleted: () => {
      setError(null);
    },
    onError: (err) => {
      setError(err);
    },
  });

  if (data && !error) {
    Cookies.set('token', data.authenticate.token);

    client
      .query({
        query: ME,
        fetchPolicy: 'no-cache',
      })
      .then((data) => {
        Cookies.set('auth_user', data.data.me.id);
        Router.push('/');
      });
  }

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
    emailAddress: yup
      .string()
      .email("Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.'")
      .required('Email Name is Required'),
    password: yup.string().required('Password is Required'),
  });

  const resolver = useYupValidationResolver(validationSchema);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthenticateInput>({ resolver });

  const login = (authenticateData: AuthenticateInput): void => {
    authenticate({ variables: { ...authenticateData } });
  };

  return (
    <MainLayout>
      <Head>
        <title>Login</title>
      </Head>

      <Box
        width="100%"
        height="calc(100vh - 128px)"
        display="flex"
        align-items="center"
        justify-content="center"
        as="form"
        onSubmit={handleSubmit((values) => {
          const authenticateData = {
            emailAddress: values.emailAddress,
            password: values.password,
          };
          login(authenticateData);
        })}
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
              Log in
            </Heading>
          </Center>

          <Stack w="100%" padding="0px 30px">
            <Box padding="40px 0px">
              <FormLabel fontWeight="500" mb="8px">
                Email
              </FormLabel>
              <Input
                isInvalid={errors.hasOwnProperty('emailAddress')}
                focusBorderColor={errors.hasOwnProperty('emailAddress') ? 'crimson' : 'blue.400'}
                errorBorderColor="crimson"
                disabled={loading}
                {...register('emailAddress')}
                placeholder="email@example.com"
                size="sm"
              />
              <Text color="tomato" fontSize="sm">
                {errors.emailAddress?.message}
              </Text>
              <FormLabel marginTop="20px" fontWeight="500" mb="8px">
                Password
              </FormLabel>
              <Input
                isInvalid={errors.hasOwnProperty('password')}
                focusBorderColor={errors.hasOwnProperty('password') ? 'crimson' : 'blue.400'}
                errorBorderColor="crimson"
                disabled={loading}
                {...register('password')}
                placeholder="********"
                type="password"
                size="sm"
              />
              <Text color="tomato" fontSize="sm">
                {errors.password?.message}
              </Text>
              <Text fontSize=".875em" color="purple.500" fontWeight="600" textAlign="right">
                Forgot Password
              </Text>

              {error &&
                error.graphQLErrors.map(({ message }, i) => (
                  <Text key={i} color="tomato" fontSize="sm">
                    {message}
                  </Text>
                ))}
            </Box>
            <Button isLoading={loading} loadingText="Loading" variant="primary" type="submit">
              Log in
            </Button>
          </Stack>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default MainModule;
