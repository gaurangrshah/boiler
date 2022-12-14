import {
  AuthTabLink,
  // CredentialsFormNew,
  MagicAuthForm,
  OAuthButtons,
  RegisterLink,
  UserRegistrationForm,
  VerifyRequest,
} from '@/components';
import { dev } from '@/utils';
import {
  Container,
  Divider,
  HStack,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type SignView =
  | 'magic'
  | 'oauth'
  | 'register'
  | 'credentials'
  | 'verify-request';

const AuthPage: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [signInView, setSignInView] = useState<SignView>('magic');
  const { data: session } = useSession();
  const isAuth = !!session?.user;
  const { asPath } = router;

  // routing booleans
  const isRegister = signInView === 'register';
  const isMagicAuth = signInView === 'magic';
  const isOAuth = signInView === 'oauth';
  const isSigninRoute = asPath.includes('signin');
  const isVerify = signInView === 'verify-request';
  // const isCredentialAuth = signInView === 'credentials';

  useEffect(() => {
    switch (asPath) {
      case '/auth/signin':
        setSignInView('magic');
        break;
      case '/auth/signin':
        setSignInView('magic');
        break;
      case '/auth/signin/oauth':
        setSignInView('oauth');
        break;
      case '/auth/register':
        setSignInView('register');
        break;
      case 'auth/verify-request':
        setSignInView('verify-request');
        break;
      case '/auth':
        setSignInView('magic');
        break;
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
      <Container w="100%" h="100%" mt="64">
        <VStack
          maxW="md"
          w="full"
          px={8}
          pb={8}
          boxShadow={shadow}
          rounded="md"
          gap={3}
        >
          {isVerify && <VerifyRequest />}
          {isRegister && <UserRegistrationForm />}
          {isSigninRoute && !isRegister && !isVerify && (
            <>
              <HStack as="ul" justify="space-between" w="full" pt={12} pb={4}>
                <AuthTabLink
                  to="magic"
                  providerName="Passwordless"
                  disabled={isMagicAuth}
                />
                <AuthTabLink
                  to="oauth"
                  providerName="OAuth"
                  disabled={isOAuth}
                />
                {/* <AuthTabLink
                  to="credentials"
                  providerName="Email"
                  disabled={true}
                /> */}
              </HStack>
              <Divider
                position="relative"
                color="transparent"
                shadow={colorMode === 'light' ? 'md' : 'dark-md'}
              />
              {isMagicAuth && <MagicAuthForm />}
              {isOAuth && <OAuthButtons />}
              {/* {isCredentialAuth && <CredentialsFormNew />} */}
            </>
          )}
          <RegisterLink isRegistered={isRegister} />
        </VStack>
      </Container>
    </PageLayout>
  );
};

export default AuthPage;
