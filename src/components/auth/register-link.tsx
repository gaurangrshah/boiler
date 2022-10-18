import { chakra } from '@chakra-ui/react';
import Link from 'next/link';

const ChNextLink = chakra(Link);
export const RegisterLink: React.FC = () => {
  return (
    <ChNextLink href="/auth/register">
      Not signed up yet? Register Now!
    </ChNextLink>
  );
};
