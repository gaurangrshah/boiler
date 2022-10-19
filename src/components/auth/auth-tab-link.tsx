import { Button, chakra } from '@chakra-ui/react';
import Link from 'next/link';

const ChNextLink = chakra(Link);

export type AuthTabLinkProps = {
  to: string;
  providerName: string;
  disabled?: boolean;
};

export function AuthTabLink({
  to,
  providerName,
  disabled,
}: AuthTabLinkProps): JSX.Element {
  return (
    <ChNextLink href={`/auth/signin/${to}`}>
      <Button w="full" size="sm" variant="outline" isDisabled={disabled}>
        {providerName}
      </Button>
    </ChNextLink>
  );
}
