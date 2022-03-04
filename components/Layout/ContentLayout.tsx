import { Container } from '@chakra-ui/react';
import { FC } from 'react';

const ContentLayout: FC = ({ children }) => (
  <Container maxWidth="1280px" padding="90px 30px">
    {children}
  </Container>
);

export default ContentLayout;
