import { ChakraTheme } from '@chakra-ui/react';

export const layerStyles: ChakraTheme['layerStyles'] = {
  'widget-col': {
    w: 'full',
    alignItems: 'flex-start',
    maxH: '675px',
    overflowY: 'auto',
  },
  'widget-panel': {
    position: 'relative',
    w: 'full',
    border: '1px solid',
    borderColor: 'panel-border',
    borderRadius: 'md',
    p: 6,
  },
  'flex-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'flex-widget-panels': {
    position: 'relative',
    w: 'full',
    mb: 6,
    alignItems: 'flex-start',
    gap: 6,
  },
};
