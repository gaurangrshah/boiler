import { ChakraTheme, theme as base } from '@chakra-ui/react';

export const components: ChakraTheme['components'] = {
  Button: {
    baseStyle: {
      fontFamily: 'body',
    },
    variants: {
      pill: (props) => ({
        ...base?.components?.Button?.variants?.outline(props),
        rounded: 'full',
        color: 'gray.500',
      }),
    },
  },
  Bar: {
    baseStyle: {
      posiition: 'relative',
      w: 'full',
      p: 8,
      maxH: 20,
      zInded: 'tooltip',
      bg: 'gray.900', // @FIXME: add mode support
    },
  },
};
