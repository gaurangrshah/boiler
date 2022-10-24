import { Box, chakra } from '@chakra-ui/react';

type DefaultProps = {
  title: string;
  children: React.ReactNode;
};

export const Widget = ({ title, children }: DefaultProps) => {
  return (
    <Box
      p={4}
      w="50%"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
    >
      <Box as="header">
        <chakra.h2 w="full" fontSize="2xl" fontWeight={800} m={0} p={0}>
          {title}
        </chakra.h2>
      </Box>
      {children}
    </Box>
  );
};
