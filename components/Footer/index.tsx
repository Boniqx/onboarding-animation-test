import Dribble from '@assets/icons/dribble';
import Facebook from '@assets/icons/facebook';
import Github from '@assets/icons/github';
import Instagram from '@assets/icons/instagram';
import Twitter from '@assets/icons/twiitter';
import { Flex, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Flex as="footer" background="#fff" padding="20px 112px" justifyContent="space-between" flexShrink={0}>
      <Text fontWeight="400" color="gray.400">
        © {new Date().getFullYear()} HOV Onboarding. All rights reserved.{' '}
      </Text>

      <HStack spacing="28px">
        <a rel="noreferrer" href="https://www.facebook.com/highoutputhq/" target="_blank">
          <Facebook />
        </a>
        <a rel="noreferrer" href="https://www.instagram.com" target="_blank">
          <Instagram />
        </a>
        <a rel="noreferrer" href="https://twitter.com/highoutputhq" target="_blank">
          <Twitter />
        </a>
        <a rel="noreferrer" href="https://github.com" target="_blank">
          <Github />
        </a>
        <a rel="noreferrer" href="https://dribbble.com/" target="_blank">
          <Dribble />
        </a>
      </HStack>
    </Flex>
  );
};

export default Footer;
