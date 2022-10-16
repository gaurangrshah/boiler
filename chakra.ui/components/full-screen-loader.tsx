import { Box, Spinner, VStack } from '@chakra-ui/react';

export const FullScreenLoader = (): JSX.Element => {
  return (
    <VStack h="" w="full">
      <Box position="absolute" top={64} left="50%" translateX="50%">
        <Spinner />
      </Box>
    </VStack>
  );
};
