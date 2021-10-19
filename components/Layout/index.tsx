import { Flex } from '@chakra-ui/react';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { FC } from 'react';

const Layout: FC = ({ children }) => (
  <Flex flexDirection="column" minHeight="100vh" alignItems="stretch">
    <Header />
    <Flex as="main" flexGrow={1} flexShrink={0}>
      {children}
    </Flex>
    <Footer />
  </Flex>
);

export default Layout;
