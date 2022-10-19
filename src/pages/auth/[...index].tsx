import {
  AuthTabLink,
  CredentialsFormNew,
  MagicAuthForm,
  OAuthButtons,
  RegisterLink,
  UserRegistrationForm,
} from '@/components';
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

type SignView = 'magic' | 'oauth' | 'register' | 'credentials';
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
  const isCredentialAuth = signInView === 'credentials';
  const isOAuth = signInView === 'oauth';
  const isSigninRoute = isMagicAuth || isOAuth || isCredentialAuth;

  useEffect(() => {
    const view = asPath.split('/')[3] || 'magic';
    setSignInView(view as SignView);
  }, [asPath]);

  // style
  const shadow = colorMode === 'light' ? 'sm' : 'md-dark';

  useEffect(() => {
    if (isAuth && !asPath.includes('register')) void router.push('/');
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
          <HStack as="ul" justify="space-between" w="full" pt={12} pb={4}>
            <AuthTabLink to="magic" providerName="Passwordless" />
            <AuthTabLink to="credentials" providerName="Email" />
            <AuthTabLink to="oauth" providerName="OAuth" />
          </HStack>
          <Divider
            position="relative"
            color="transparent"
            shadow={colorMode === 'light' ? 'md' : 'dark-md'}
          />
          {!isSigninRoute && isRegister && <UserRegistrationForm />}
          {isSigninRoute && !isAuth && (
            <>
              {isMagicAuth && <MagicAuthForm />}
              {isOAuth && <OAuthButtons />}
            </>
          )}
          {isCredentialAuth && <CredentialsFormNew />}
          <RegisterLink isRegistered={isRegister} />
        </VStack>
      </Container>
    </PageLayout>
  );
};

export default AuthPage;
