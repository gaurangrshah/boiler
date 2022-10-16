import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react';
import docLinks from '__data/doc-links.json';
import { Drawer, mapDocs } from '../components';

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        pos="absolute"
        left={0}
        bottom={0}
        top={0}
        w={3}
        onClick={onOpen}
        _hover={{ bg: 'brand.800' }}
      />
      <Drawer {...{ isOpen, onOpen, onClose }}>
        <Text as="p" m={0} fontWeight={400} fontSize="1.5rem" lineHeight="2rem">
          This stack uses:
        </Text>
        <VStack w="90%" mt={6} ml="auto" gap={4}>
          {docLinks.map(mapDocs)}
        </VStack>
        {children}
      </Drawer>
    </>
  );
};