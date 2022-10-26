import { ChakraTheme } from '@chakra-ui/react';

// @link: https://chakra-ui.com/docs/styled-system/semantic-tokens
export const semanticTokens: ChakraTheme['semanticTokens'] = {
  colors: {
    error: 'red.400',
    text: {
      default: 'brand.900',
      _dark: 'brand.40',
    },
    link: {
      default: 'purple.400',
      _dark: 'purple.200',
    },
    heading: {
      default: 'brand.300',
      _dark: 'brand.500',
    },
  },
};
