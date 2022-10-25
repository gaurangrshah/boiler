import { useColorMode } from '@chakra-ui/react';

type ColorModes = {
  [key: string]: string;
};

export function useColor(type: string) {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLight = colorMode === 'light';

  const colorModes: ColorModes = {
    'text-stat': isLight ? 'brand.700' : 'brand.300',
    'bg-panel': isLight ? 'green.50' : '#041b15',
  };

  return {
    mode: colorModes[type],
    toggleColorMode,
  };
}
