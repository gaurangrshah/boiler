import { ChakraTheme } from '@chakra-ui/react';
import { borders } from './borders';
import { breakpoints } from './breakpoints';
import { colors } from './colors';
import { config } from './config';
import { layerStyles } from './layerStyles';
import { radii } from './radii';
import { semanticTokens } from './semanticTokens';
import { shadows } from './shadows';
import { sizes } from './sizes';
import { space } from './space';
import { textStyles } from './textStyles';
import { transition } from './transition';
import { zIndices } from './zIndices';

export const foundations: Pick<
  ChakraTheme,
  | 'borders'
  | 'breakpoints'
  | 'config'
  | 'colors'
  | 'layerStyles'
  | 'radii'
  | 'semanticTokens'
  | 'shadows'
  | 'sizes'
  | 'space'
  | 'textStyles'
  | 'transition'
  | 'zIndices'
> = {
  borders,
  breakpoints,
  colors,
  config,
  layerStyles,
  radii,
  semanticTokens,
  shadows,
  sizes,
  space,
  textStyles,
  transition,
  zIndices,
};
