import { Box, Container, Flex } from '@chakra-ui/react';
import { FC } from 'react';

interface HovSectionProps {
  bg?: string;
  height?: string | number;
  hasOverlay?: boolean;
  hasNoPadding?: boolean;
}

const HovSection: FC<HovSectionProps> = ({ bg, hasOverlay, height, hasNoPadding, children }) => (
  <Flex
    position="relative"
    bg={`url(${bg})`}
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    w="full"
    height={height}
  >
    <Container maxWidth="1024px" zIndex={6} {...(!hasNoPadding ? { padding: '90px 30px' } : { padding: '0' })}>
      {children}
    </Container>
    {hasOverlay && <Box width="full" height="full" position="absolute" zIndex="5" bg="#05080b5f" />}
  </Flex>
);

export default HovSection;
