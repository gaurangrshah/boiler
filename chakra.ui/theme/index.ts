import { debug as globalDebug, dev } from '@/utils';
import {
  ChakraTheme,
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
} from '@chakra-ui/react';
import { components } from './components';
import { foundations } from './foundations';
import { styles } from './styles';
import { typography } from './typography';

const debug = globalDebug || false;

export const theme: Partial<ChakraTheme> = extendTheme(
  {
    blur: {},
    styles,
    components,
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
