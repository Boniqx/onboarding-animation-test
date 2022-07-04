import { Box, BoxProps, Flex, FlexProps, Text, TextProps } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

export const MotionBox = motion<BoxProps>(Box);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionText = motion<TextProps>(Text);
