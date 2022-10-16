import { Button, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakraui/layouts/page-layout';
import NextLink from 'next/link';

const NotFoundPage = () => {
  return (
    <PageLayout type="default" title="404" description="Not Found">
      <VStack spacing={2} justify="center" h="100vh">
        <Heading>404 Not found</Heading>
        <Divider />
        <Text>The page you&apos;re looking for was not found.</Text>
        <NextLink href="/" passHref>
          <Button colorScheme="brand" size="md">
            Return to home
          </Button>
        </NextLink>
      </VStack>
    </PageLayout>
  );
};

export default NotFoundPage;
