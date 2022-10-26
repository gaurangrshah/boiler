import { ChakraTheme } from '@chakra-ui/react';
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

export const styles: ChakraTheme['styles'] = {
  global: (props: GlobalStyleProps) => ({
    '*': {
      border: 0,
      margin: 0,
      padding: 0,
      fontFeatureSettings: `'kern'`,
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    },
    '*, *::before, *::after': {
      borderColor: mode('gray.500', 'gray.700')(props),
      boxSizing: 'border-box',
      wordWrap: 'break-word',
    },
    '*::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px var(--chakra-colors-bg1)',
      borderRadius: '10px',
      backgroundColor: 'transparent',
    },
    '*::-webkit-scrollbar': {
      width: '9px',
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      boxShadow: 'inset 0 0 6px var(--chakra-colors-secondary)',
      backgroundColor: 'var(--chakra-colors-secondary)',
    },
    'html, body': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      scrollBehavior: 'smooth',
      // using % here allows users to override default size in browser settings??
      fontSize: '85.2%', // == 10px
      fontFamily: 'default',
      background: 'transparent',
    },
    body: {
      position: 'relative',
      fontFamily: 'body',
      // color: mode('brand.900', 'brand.50')(props),
      fontSize: '1.5rem',
      lineHeight: 2,
      textRendering: 'optimizeLegibility',
      WebkitTextSizeAdjust: 'none',
      MozFontSmoothing: 'grayscale',
      // bg: mode('brand.50', 'brand.900')(props),
      overflowX: 'hidden',
      maxW: 'full',
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.300')(props),
    },
    'input:focus': {
      border: 'inherit',
    },
    'input:focus:invalid': {
      backround: 'rgba(255, 224, 224, 1)',
    },
    'input:focus, input:focus:valid': {
      backround: 'rgba(226, 250, 219, 1)',
    },
    'a:active, a:focus, a:visited': {
      outline: 0,
      border: 'none',
      outlineStyle: 'none',
      textDecoration: 'none',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0) !important',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    a: {
      textDecoration: 'none',
      color: 'inherit',
      // color: mode('black', 'white')(props),
    },
    h1: {
      textStyle: 'h1',
    },
    h2: {
      textStyle: 'h2',
    },
    h3: {
      textStyle: 'h3',
    },
    h4: {
      textStyle: 'h4',
    },
    p: {
      textStyle: 'body',
    },
    small: {
      textStyle: 'tiny',
    },
  }),
};
