import { ChakraTheme } from '@chakra-ui/react';

export const textStyles: ChakraTheme['textStyles'] = {
  h1: {
    fontSize: '5xl',
    fontFamily: 'heading',
    fontWeight: 900,
  },
  h2: {
    fontSize: '3xl',
    fontFamily: 'heading',
    fontWeight: 800,
  },
  h3: {
    fontSize: '2xl',
    fontFamily: 'heading',
    fontWeight: 700,
  },
  h4: {
    fontSize: 'xl',
    fontFamily: 'heading',
    fontWeight: 600,
  },
  body: {
    fontSize: 'initial',
    fontFamily: 'body',
  },
  description: {
    fontSize: 'lg',
    fontFamily: 'body',
  },
  stat: {
    fontSize: 'sm',
    fontFamily: 'body',
  },
  tiny: {
    fontSize: 'xs',
    fontFamily: 'body',
  },
  title: {
    fontSize: 'xl',
    fontWeight: 700,
    lineHeight: 1.2,
  },
};
