import { debug as globalDebug, dev } from '@/utils';
import {
  ChakraTheme,
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultProps,
} from '@chakra-ui/react';
import { styles } from './global';

const debug = globalDebug || false;

const colors: ChakraTheme['colors'] = {
  brand: {
    50: '#ebf0fa', // bg
    100: '#c2d1f0',
    200: '#99b3e5', // accent
    300: '#7094db', // secondaryDark
    400: '#4775d1', // secondary
    500: '#2e5cb8', // primary
    600: '#24478f', // accentDark
    700: '#1a3366', // primaryDark
    800: '#0f1f3d',
    900: '#050a14', // bg-dark
  },
};
// @link: https://chakra-ui.com/docs/styled-system/semantic-tokens
const semanticTokens: ChakraTheme['semanticTokens'] = {
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

const fonts: ChakraTheme['fonts'] = {
  heading: `Josefin Sans, ${base.fonts.heading}`,
  body: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  default: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;`,
};
// 'fontSizes' | 'fontWeights' | 'letterSpacings' | 'lightHeights'
const typography: Pick<
  ChakraTheme,
  'fonts' | 'fontSizes' | 'fontWeights' | 'letterSpacings' | 'lineHeights'
> &
  typeof fonts = {
  fonts,
  fontSizes: {},
  fontWeights: {},
  letterSpacings: {},
  lineHeights: {},
};

const foundations: Pick<
  ChakraTheme,
  | 'borders'
  | 'breakpoints'
  | 'colors'
  | 'radii'
  | 'shadows'
  | 'sizes'
  | 'space'
  | 'transition'
  | 'zIndices'
> &
  typeof colors = {
  blur: {},
  borders: {},
  breakpoints: {
    base: '0em',
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536pxs
  },
  colors,
  radii: {},
  shadows: {
    '2xl-dark-': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
    'base-dark':
      '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
    'inner-dark': 'inset 0 2px 4px 0 rgba(255, 255, 255,0.06)',
    'md-dark':
      '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
    'outline-dark': '0 0 0 3px rgba(255, 255, 225, 0.6)',
    'sm-dark': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
    'xl-dark':
      '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
    'xs-dark': '0 0 0 1px rgba(255, 255, 255, 0.05)',
  },
  sizes: {},
  space: {},
  transition: {
    property: {},
    easing: {},
    duration: {},
  },
  zIndices: {},
};

const components: ChakraTheme['components'] = {
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
};

export const config: ChakraTheme['config'] = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme: Partial<ChakraTheme> = extendTheme(
  {
    blur: {},
    config,
    styles,
    components,
    semanticTokens,
    ...foundations,
    ...typography,
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
  withDefaultProps({
    defaultProps: {
      color: 'text',
    },
    // components: ['Heading', 'Text'],
  })
);

dev.log('chakra theme', theme, debug);
