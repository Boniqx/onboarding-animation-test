import { ApolloError, useMutation } from '@apollo/client';
import { Box, Button, Center, Container, Heading, Input, Stack, Text } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { AUTHENTICATE } from 'graphql/mutations/authenticate';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Router from 'next/router';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthenticateInput } from 'types/types';

const MainModule: FC = () => {
  const { register, handleSubmit } = useForm<AuthenticateInput>();
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

    Router.push('/');
  }

  const login = (authenticateData: AuthenticateInput): void => {
    authenticate({ variables: { ...authenticateData } });
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <Box
        height="calc(100vh - 64px)"
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
              <Text fontWeight="500" mb="8px">
                Email
              </Text>
              <Input disabled={loading} {...register('emailAddress')} placeholder="email@example.com" size="sm" />
              <Text marginTop="20px" fontWeight="500" mb="8px">
                Password
              </Text>
              <Input disabled={loading} {...register('password')} placeholder="********" type="password" size="sm" />
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
    </Layout>
  );
};

export default MainModule;
