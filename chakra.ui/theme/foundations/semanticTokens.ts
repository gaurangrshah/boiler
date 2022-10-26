import { ChakraTheme } from '@chakra-ui/react';

export const semanticTokens: ChakraTheme['semanticTokens'] = {
  colors: {
    error: 'red.400',
    text: {
      default: 'brand.900',
      _dark: 'brand.40',
    },
    link: {
      default: 'purple.300',
      _dark: 'purple.600',
    },
    'bg-panel': {
      default: 'green.50',
      _dark: '#020f0b',
    },
    'panel-border': {
      default: 'green.200',
      _dark: 'gray.700',
    },
    heading: {
      default: 'brand.300',
      _dark: 'brand.500',
    },
  },
};
