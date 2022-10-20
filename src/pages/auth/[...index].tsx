import { OAuthButton, RegisterLink, UserRegistrationForm } from '@/components';
import { Container, useColorMode, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type SignView = 'spotify' | 'register'; // @TODO: add error page /auth/error

const AuthPage: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [signInView, setSignInView] = useState<SignView>('spotify');
  const { data: session } = useSession();
  const isAuth = !!session?.user;
  const { asPath } = router;

  // routing booleans
  const isRegister = signInView === 'register';
  const isSpotify = signInView === 'spotify';

  useEffect(() => {
    switch (asPath) {
      case '/auth/signin':
        setSignInView('spotify');
        break;
      case '/auth/signin/spotify':
        setSignInView('spotify');
        break;
      case '/auth/register':
        setSignInView('register');
      default:
        break;
    }
  }, [asPath]);

  // style
  const shadow = colorMode === 'light' ? 'sm' : 'md-dark';

  useEffect(() => {
    if (isAuth) void router.push('/');
  }, [isAuth, asPath, router]);

  return (
    <PageLayout title={asPath} type="default">
      <Container w="100%" h="100%" mt="64" boxShadow={shadow}>
        <VStack maxW="md" w="full" px={12} pb={8} rounded="md" gap={3}>
          {isSpotify && <OAuthButton />}
          {isRegister && <UserRegistrationForm />}
          {<RegisterLink isRegistered={isRegister} />}
        </VStack>
      </Container>
    </PageLayout>
  );
};

export default AuthPage;
