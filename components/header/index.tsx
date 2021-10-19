import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, IconButton, Image, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FC } from 'react';
import Logo from '../../assets/icons/logo';

const Header: FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = (): void => (isOpen ? onClose() : onOpen());
  const token = Cookies.get('token');

  return (
    <Flex
      as="nav"
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
      <Container position="static" display="flex" maxW="container.xl">
        <Flex align="center" mr={5}>
          <Link href={`/`}>
            <IconButton height="auto" variant="unstyled" aria-label="logo-icon">
              <Logo />
            </IconButton>
          </Link>
        </Flex>

        <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <Button variant="unstyled">
            <Link href={`/`}>Products</Link>
          </Button>
          <Spacer />
          <Flex verticalAlign="center" align="center" display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}>
            {token ? (
              <>
                <Image src="/images/bell.png" height="18px" width="16px" marginRight="1.5em" />

                <Image src="/images/profile.png" height="auto" width="32px" />
              </>
            ) : (
              <>
                <Link href={`/login`}>
                  <Button variant="outline" mr={5}>
                    Log in
                  </Button>
                </Link>

                <Link href={`/signup`}>
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            )}
          </Flex>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Header;
