// import { trpc } from '@/utils';
import { ChakraTheme, extendTheme } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { theme } from '../theme';

export function useCustomTheme(): Partial<ChakraTheme> {
  // const { data: session, status } = useSession();
  // let _id = '';
  // if (session?.user) {
  //   _id = session.user?.id;
  // }

  const [customTheme, setCustomTheme] = useState<Partial<ChakraTheme>>(theme);

  // const { data: prefs } = trpc.useQuery(['prefs.all'], {
  //   enabled: !!_id,
  // });

  // const colorScheme = prefs?.ColorScheme && prefs?.ColorScheme;

  // const isLoading = status === 'loading';
  // useEffect(() => {
  //   if (isLoading /* || !_id */) return;
  //   const colors: ChakraTheme['colors'] = {
  //     brand: {
  //       50: String(colorScheme?.bg), // bg
  //       100: '#c2d1f0',
  //       200: String(colorScheme?.accent), // accent
  //       300: String(colorScheme?.secondaryDark), // secondaryDark
  //       400: String(colorScheme?.secondary), // secondary
  //       500: String(colorScheme?.primary), // primary
  //       600: String(colorScheme?.accentDark), // accentDark
  //       700: String(colorScheme?.primaryDark), // primaryDark
  //       800: '#0f1f3d',
  //       900: String(colorScheme?.bgDark), // bg-dark
  //     },
  //   };

  //   setCustomTheme(
  //     extendTheme({
  //       ...theme,
  //       colors,
  //     })
  //   );
  // }, [colorScheme, _id, isLoading, setCustomTheme]);

  return customTheme;
}
