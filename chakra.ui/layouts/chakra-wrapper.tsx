import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';
import type { GetServerSidePropsContext } from 'next';
import { theme } from '../theme';
import { useCustomTheme } from '../hooks/use-custom-theme';

type ChakraProps = {
  cookies: string;
  children: React.ReactNode;
};

export const ChakraWrapper: React.FC<ChakraProps> = ({ cookies, children }) => {
  const customTheme = useCustomTheme();

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
