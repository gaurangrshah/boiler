import {
  Box,
  Button,
  chakra,
  Container,
  Divider,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onPromise, trpc } from '@/utils';
import { CustomIcon } from 'chakra.ui/icons';
import { parseFormData } from '../../utils/form';
import { MagicAuthForm } from '@/components/auth/magic-auth';

type SignView = 'magic' | 'oauth' | 'register';
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
  // const isCredentialAuth = signInView === 'credentials';
  const isOAuth = signInView === 'oauth';
  const isSigninRoute = isMagicAuth || isOAuth;

  useEffect(() => {
    const view = asPath.split('/')[3] || 'magic';
    setSignInView(view as SignView);
  }, [asPath]);

  // style
  const shadow = colorMode === 'light' ? 'sm' : 'md-dark';

  useEffect(() => {
    if (isAuth) void router.push('/');
  }, [isAuth, router]);

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
            {/* <AuthTabLink to="magic" providerName="Passwordless" /> */}
            {/* <AuthTabLink to="credentials" providerName="Email" /> */}
            {/* <AuthTabLink to="oauth" providerName="OAuth" /> */}
          </HStack>
          <Divider
            position="relative"
            color="transparent"
            shadow={colorMode === 'light' ? 'md' : 'dark-md'}
          />
          {/* {!isSigninRoute && isRegister && !isAuth && <UserRegistrationForm />} */}
          {isSigninRoute && !isAuth && (
            <>
              {isMagicAuth && (
                <>
                  <MagicAuthForm
                    csrfToken={data?.csrfToken}
                    providerId="email"
                  />
                  {/* <VStack w="full" color="white">
                    <chakra.form
                      onSubmit={onPromise(async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const inputs = [...form.querySelectorAll('input')].map(
                          parseFormData
                        );
                        await signIn('email', {
                          callbackUrl:
                            '/auth/verify-request?success=Please check your email.',
                          ...inputs,
                        });
                      })}
                    >
                      <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={data?.csrfToken}
                        disabled
                      />
                      <InputGroup>
                        <Input
                          name="email"
                          type="text"
                          placeholder="you@youremail.com"
                          w="full"
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label="submit"
                            type="submit"
                            size="sm"
                            icon={
                              <CustomIcon
                                icon="plane"
                                size="1.5rem"
                                color="brand.700"
                              />
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                    </chakra.form>
                  </VStack> */}
                </>
              )}
              {isOAuth && (
                <VStack alignItems="flex-end" gap={4}>
                  {data?.providers &&
                    Object.values(data?.providers)?.map((provider) => {
                      if (
                        provider?.id !== 'credentials' &&
                        provider?.id !== 'email'
                      ) {
                        return (
                          <Box key={provider.id}>
                            {/* <OAuthButton key={provider?.id} provider={provider} /> */}
                            <Button
                              w="full"
                              size="lg"
                              variant="outline"
                              onClick={() => void signIn(provider?.id)}
                            >
                              OAuth
                            </Button>
                          </Box>
                        );
                      }
                    })}
                </VStack>
              )}
            </>
          )}
          {/* <RegisterLink /> */}
        </VStack>
      </Container>
    </PageLayout>
  );
};

export default AuthPage;

// export const getServerSideProps: GetServerSideProps<AuthPageProps> = async (
//   context
// ) => {
//   const { req } = context;
//   const session = await getSession({ req });

//   if (session) {
//     return {
//       redirect: { destination: '/?success=You are already signed in.' },
//       props: {
//         providers: null,
//         csrfToken: undefined,
//         isAuth: false,
//       },
//     };
//   }

//   return {
//     props: {
//       providers: await getProviders(),
//       csrfToken: await getCsrfToken(),
//       isAuth: !!session,
//     },
//   };
// };
