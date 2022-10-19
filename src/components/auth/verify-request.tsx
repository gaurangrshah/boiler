import { chakra, Container } from '@chakra-ui/react';

export const VerifyRequest: React.FC = () => {
  return (
    <Container w="full" textAlign="center" centerContent>
      <chakra.h1 fontSize="2xl">Please check Your Email</chakra.h1>
      <chakra.p>A Link has been sent to your email address.</chakra.p>
    </Container>
  );
};
