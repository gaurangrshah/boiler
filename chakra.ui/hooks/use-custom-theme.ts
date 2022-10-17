import { ChakraTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { theme } from '../theme';
import { trpc } from 'src/utils/trpc';
import { omit } from '../../src/utils/lodash';
import { mergeTheme } from '../utils/mergeThemes';

export function useCustomTheme(): Partial<ChakraTheme> {
  const [customTheme, setCustomTheme] = useState<Partial<ChakraTheme>>(theme);
  const { data: user, isLoading } = trpc.preference.all.useQuery();

  useEffect(() => {
    if (isLoading) return;
    if (
      !user ||
      !user?.preferences?.length ||
      !user?.preferences[0]?.colorScheme
    ) {
      return;
    }
    const colorScheme = user?.preferences[0].colorScheme[0];

    const colors = colorScheme ? omit(colorScheme, 'prefernceId', 'id') : {};

    setCustomTheme(mergeTheme(colors));
  }, [user, customTheme, isLoading, setCustomTheme]);

  return customTheme;
}
