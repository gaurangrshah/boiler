import { theme as base } from '@chakra-ui/react';
import { StyleConfig } from '@chakra-ui/theme-tools';

export const components: Record<string, StyleConfig> = {
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
  Widget: {
    // baseStyle: ({ colorMode }) => ({}),
    baseStyle: {
      color: 'text',
      bg: 'transparent',
      w: 'full',
      minH: '200px',
      p: 4,
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'panel-border',
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
