import { Button, VStack } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { RegisterLink } from './register-link';

// @TODO: extend provider type without errors
type ProviderAsProp = { name: string; id: string };

type AuthProps = {
  provider: ProviderAsProp;
};
export const OAuthButton: React.FC<AuthProps> = ({
  provider,
}): JSX.Element | null => {
  if (provider?.name !== 'credentials') {
    const btnLabel = `Signin with ${provider?.name}`;
    return (
      <VStack alignItems="flex-end" gap={4}>
        <Button
          w="full"
          size="lg"
          variant="outline"
          onClick={() => void signIn(provider?.id)}
        >
          {btnLabel}
        </Button>
        <RegisterLink />
      </VStack>
    );
  }

  return null;
};
