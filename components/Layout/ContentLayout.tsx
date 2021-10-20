import { Container } from '@chakra-ui/react';
import { FC } from 'react';

const ContentLayout: FC = ({ children }) => (
  <Container maxWidth="1220px" padding="90px 0px">
    {children}
  </Container>
);

export default ContentLayout;
