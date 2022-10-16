import type { BoxProps, ContainerProps, FlexProps } from '@chakra-ui/react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const MotionContainer = motion<ContainerProps>(Container);
export const MotionBox = motion<BoxProps>(Box);
export const MotionFlex = motion<FlexProps>(Flex);
