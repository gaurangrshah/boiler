import { Button, VStack } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

export const OAuthButtons = (): JSX.Element | null => {
  return (
    <VStack alignItems="flex-end" gap={4}>
      <Button
        w="full"
        size="lg"
        variant="outline"
        onClick={() => void signIn('spotify')}
      >
        Sign in with Spotify
      </Button>
    </VStack>
  );
};
