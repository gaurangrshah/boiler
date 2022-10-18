import { chakra } from '@chakra-ui/react';
import Link from 'next/link';

type RegisterProps = {
  isRegistered: boolean;
};

const ChNextLink = chakra(Link);
export const RegisterLink: React.FC<RegisterProps> = ({
  isRegistered,
}): JSX.Element => {
  return (
    <>
      {isRegistered ? (
        <ChNextLink href="/auth/signin">
          Already registered? Sign in Now!
        </ChNextLink>
      ) : (
        <ChNextLink href="/auth/signin/register">
          Not signed up yet? Register Now!
        </ChNextLink>
      )}
    </>
  );
};
