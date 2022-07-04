import { Button, Container, Flex, HStack, IconButton, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Header: FC = (props) => {
  const router = useRouter();

  return (
    <Flex
      as="header"
      align="center"
      flexShrink={0}
      flexDirection="row"
      alignItems="center"
      width="100%"
      height="64px"
      left="0px"
      top="0px"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      justifyContent="space-between"
      bg="#FFF"
      {...props}
    >
      <Container height="100%" position="static" display="flex" maxW="1280px" padding="0px 30px">
        <HStack justifyContent="space-between" w="full">
          <Flex align="center" mr={5}>
            <Link href={`/`}>
              <IconButton height="auto" variant="unstyled" aria-label="logo-icon">
                <Image src="/logo.png" />
              </IconButton>
            </Link>
          </Flex>

          <HStack spacing={4}>
            <Button
              height="100%"
              variant="unstyled"
              borderBottom={router.pathname.includes('framer-basic') ? '2px solid #080a6b' : ''}
              borderRadius="0"
            >
              <Link href={`/`}>Home</Link>
            </Button>
            <Button
              height="100%"
              variant="unstyled"
              borderBottom={router.pathname.includes('framer-basic') ? '2px solid #080a6b' : ''}
              borderRadius="0"
            >
              <Link href={`/`}>Ventures</Link>
            </Button>
            <Button
              height="100%"
              variant="unstyled"
              borderBottom={router.pathname.includes('framer-basic') ? '2px solid #080a6b' : ''}
              borderRadius="0"
            >
              <Link href={`/`}>About Us</Link>
            </Button>
            <Button
              height="100%"
              variant="unstyled"
              borderBottom={router.pathname.includes('framer-basic') ? '2px solid #080a6b' : ''}
              borderRadius="0"
            >
              <Link href={`/`}>Careers</Link>
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Flex>
  );
};

export default Header;
