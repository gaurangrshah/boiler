import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';
import type { GetServerSidePropsContext } from 'next';
import { trpc } from '../../src/utils';
import { mergeTheme } from '../utils/mergeThemes';
import { theme } from '../theme';
import { omit } from '@/utils';

type ChakraProps = {
  cookies: string;
  children: React.ReactNode;
};

export const ChakraWrapper: React.FC<ChakraProps> = ({ cookies, children }) => {
  const { data: user, status } = trpc.preference.all.useQuery();
  let customTheme;
  if (user && user?.preferences?.length && user?.preferences[0]?.colorScheme) {
    const colorScheme = user?.preferences[0].colorScheme[0];

    const _colorScheme = colorScheme
      ? omit(colorScheme, 'prefernceId', 'id')
      : {};
    customTheme = mergeTheme(_colorScheme);
  }

  const colorModeManager =
    // https://chakra-ui.com/docs/styled-system/color-mode#add-colormodemanager-optional-for-ssr
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraProvider
      resetCSS
      theme={customTheme ?? theme}
      colorModeManager={colorModeManager}
    >
      {children}
    </ChakraProvider>
  );
};

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
    },
  };
}
